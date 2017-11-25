using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WithAngular6.Models
{
    public class Log
    {
        public int Id { get; set; }
        public int WorkoutProgramId { get; set; }

        public String username { get; set; }
        public DateTime date { get; set; }
        public WorkoutProgram WorkoutProgram { get; set; }
    }
}
