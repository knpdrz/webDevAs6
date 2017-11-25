using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WithAngular6.Models;

namespace WithAngular6.Data
{
    public class WorkoutsContext : DbContext
    {
        public WorkoutsContext(DbContextOptions<WorkoutsContext> options) : base(options)
        {

        }
        public DbSet<WorkoutProgram> WorkoutPrograms { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Log> Logs { get; set; }

    }
}
