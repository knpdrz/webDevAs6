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
                return null;
            }
            _logger.LogInformation("!!!!!!!!!!!! in get with " + _context.WorkoutPrograms.Count());
            return _context.WorkoutPrograms.ToList();
        }

        // GET api/programs/Workout1
        [HttpGet("{name}", Name = "GetProgram")]
        public IActionResult GetByName(string name)
        {
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

        [HttpPost]
        public IActionResult Create([FromBody] WorkoutProgram program)
        {
            _context.WorkoutPrograms.Add(program);
            _context.SaveChanges();

            return CreatedAtRoute("GetProgram", new { name = program.Name }, program);
        }

        [HttpPost("{name}/exercises")]
        public IActionResult CreateExercise(string name, [FromBody] Exercise exercise)
        {
            if (name == null)
            {
                return BadRequest();
            }
            //get program to which we want to add to
            var program = _context.WorkoutPrograms
                .Include(wp => wp.exercises)
                .Include(wp => wp.logs)
                .SingleOrDefault(m => m.Name == name);

            exercise.WorkoutProgramId = program.Id;
            _context.Exercises.Add(exercise);
            _context.SaveChanges();

            return CreatedAtRoute("GetProgram", new { name = program.Name }, exercise);
        }

        [HttpPost("{name}/logs")]
        public IActionResult CreateLog(string name, [FromBody] Log log)
        {
            if (name == null)
            {
                return BadRequest();
            }
            //get program to which we want to add to
            var program = _context.WorkoutPrograms
                .Include(wp => wp.exercises)
                .Include(wp => wp.logs)
                .SingleOrDefault(m => m.Name == name);

            log.WorkoutProgramId = program.Id;
            _context.Logs.Add(log);
            _context.SaveChanges();

            return CreatedAtRoute("GetProgram", new { name = program.Name }, log);
        }

    }
}
