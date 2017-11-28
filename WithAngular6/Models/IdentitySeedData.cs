using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WithAngular6.Models
{
    public class IdentitySeedData
    {
        private const string adminUser = "Admin";
        private const string adminPassword = "Secret123$";
       /* public static async void EnsurePopulated(IApplicationBuilder app)
        {
            UserManager<ApplicationUser> userManager = app.ApplicationServices
            .GetRequiredService<UserManager<ApplicationUser>>();
            ApplicationUser user = await userManager.FindByIdAsync(adminUser);
            if (user == null)
            {
                user = new ApplicationUser("Admin");
                await userManager.CreateAsync(user, adminPassword);
            }
        }*/
    }
}
