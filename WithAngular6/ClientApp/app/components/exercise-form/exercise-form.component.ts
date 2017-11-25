import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm }  from '@angular/forms';
import { Exercise } from '../exercise';

@Component({
  selector: 'exercise-form',
  templateUrl: './exercise-form.component.html'
})
export class ExerciseFormComponent{
  @Output() exerciseFormSubmitted:EventEmitter<Exercise>= new EventEmitter();
  name:string;
  repstime:string;
  sets:number;
  description:string;
  
  onSubmit(form : NgForm) { 
    var exercise = new Exercise(
      form.value.name,form.value.repstime,
      form.value.sets, form.value.description);

    //sending new exercise data to program page
    this.exerciseFormSubmitted.emit(exercise);

    form.reset();
  }

  constructor() { }
  
}