using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WithAngular6.Models
{
    public class Exercise
    {
    public int Id { get; set; }
    public int WorkoutProgramId { get; set; }
    public String name { get; set; }
    public String repstime { get; set; }
    public int sets { get; set; }
    public String description { get; set; }
    public WorkoutProgram WorkoutProgram { get; set; }

    }
}
