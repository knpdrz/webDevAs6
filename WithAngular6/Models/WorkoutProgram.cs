using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WithAngular6.Models
{
    public class WorkoutProgram
    {
    public int Id { get; set; }

    public String Name { get; set; }
    public String author { get; set; }
    public int difficulty { get; set; }
    public ICollection<Exercise> exercises { get; set; }
    public ICollection<Log> logs { get; set; }

   
    }
}
