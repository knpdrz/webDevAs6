using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WithAngular6.Models;

namespace WithAngular6.Data
{
    public static class WorkoutsInitializer
    {
        public static void Initialize(WorkoutsContext context)
        {
            context.Database.EnsureCreated();

            //look for any workouts
            if (context.WorkoutPrograms.Any())
            {
                return; //db already has data
            }

            
            var workouts = new WorkoutProgram[]
            {
                new WorkoutProgram{author="MR",Name="workout102",difficulty=3},
                new WorkoutProgram{author="PR",Name="workout99",difficulty=1},
                new WorkoutProgram{author="KR",Name="workout87",difficulty=2}

            };

            foreach(WorkoutProgram wp in workouts)
            {
                context.WorkoutPrograms.Add(wp);
            }

            context.SaveChanges();

            var exercises = new Exercise[]
            {
                new Exercise{name="squat",repstime="12",sets=1,description="sq and up", WorkoutProgramId=1},
                new Exercise{name="bench press",repstime="9",sets=3,description="presss", WorkoutProgramId=2},
                new Exercise{name="rollover",repstime="5s",sets=1, description="rolll", WorkoutProgramId=2}


            };

            foreach (Exercise ex in exercises)
            {
                context.Exercises.Add(ex);
            }

            context.SaveChanges();

            DateTime date = DateTime.Now;
            var logs = new Log[]
            {
                new Log{date=date, username="MR", WorkoutProgramId=1},
                new Log{date=date, username="PR", WorkoutProgramId=2}

            };

            foreach (Log l in logs)
            {
                context.Logs.Add(l);
            }

            context.SaveChanges();

        }
    }
}
