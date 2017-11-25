using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WithAngular6.Data;
using WithAngular6.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WithAngular6
{
    [Route("api/programs")]
    public class ProgramsController : Controller
    {
        private readonly WorkoutsContext _context;
        private ILogger<ProgramsController> _logger;

        public ProgramsController(WorkoutsContext context, ILogger<ProgramsController> logger)
        {
            _context = context;
            _logger = logger;
          
        }
        // GET: api/programs
        [HttpGet]
        public IEnumerable<WorkoutProgram> Get()
        {
            if(_context.WorkoutPrograms == null)
            {
                _logger.LogInformation("!!!!!!!!!!!! wp are null");
                return null;
            }
            _logger.LogInformation("!!!!!!!!!!!! in get with " + _context.WorkoutPrograms.Count());
            return _context.WorkoutPrograms.ToList();
        }

        // GET api/programs/Workout1
        [HttpGet("{name}", Name = "GetProgram")]
        public IActionResult GetByName(string name)
        {
            /*var item =  _context.WorkoutPrograms
                .FirstOrDefault(wp => wp.Name == name);*/
            
            if (name == null)
            {
                return NotFound();
            }
            
            var program =  _context.WorkoutPrograms
                .Include(wp => wp.exercises)
                .Include(wp => wp.logs)
                .SingleOrDefault(m => m.Name == name);
            return new ObjectResult(program);
           
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
