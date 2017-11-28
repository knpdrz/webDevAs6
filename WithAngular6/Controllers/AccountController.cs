using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WithAngular6.Models;
using WithAngular6.Data;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WithAngular6.Controllers
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager
            , SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public string Index()
        {
            return "helloo!";
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] WUser wUser)
        {
            var newUser = new ApplicationUser {
                UserName = wUser.Email,
                Email = wUser.Email,
                Name = wUser.Name, };
            var userCreationResult = await _userManager
                .CreateAsync(newUser, wUser.Password);
            if (userCreationResult.Succeeded)
            {
                //todo not sure if needed
                //await _context.ApplicationUsers.AddAsync(newUser);
                //await _context.SaveChangesAsync();
                return new ObjectResult(GenerateToken(wUser.Email));
                //return Ok(newUser);
            }

            foreach (var error in userCreationResult.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
            
            return BadRequest(ModelState);
        }

        /*[HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] WUser wUser)
        {
            var passwordSignInResult = await _signInManager
                .PasswordSignInAsync(wUser.Email, wUser.Password, 
                isPersistent: false, lockoutOnFailure: false);
            if (passwordSignInResult.Succeeded)
            {
                return Ok();
            }
            ModelState.AddModelError(string.Empty, "Invalid login");
            return BadRequest(ModelState);
        }*/

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("jwtlogin")]
        public async Task<IActionResult> JWTlogin([FromBody]WUser wUser)
        {
            var user = await _userManager.FindByEmailAsync(wUser.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid login");
                return BadRequest(ModelState);
            }
            var passwordSignInResult = await _signInManager
                .CheckPasswordSignInAsync(user, wUser.Password, false);
            if (passwordSignInResult.Succeeded)
                return new ObjectResult(GenerateToken(wUser.Email));
            return BadRequest("Invalid login");
        }

        private string GenerateToken(string username)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };

            var token = new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("the secret that needs to be at least 16 characeters long for HmacSha256")),
                                             SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}