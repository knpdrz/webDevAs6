import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm }  from '@angular/forms';
import {Log} from '../log';

@Component({
  selector: 'log-form',
  templateUrl: './log-form.component.html'
})
export class LogFormComponent{
  @Output() logFormSubmitted:EventEmitter<Log>= new EventEmitter();
  username :string;
  date :Date;
  
  onSubmit(form : NgForm) { 
    var log = new Log(
      form.value.username,
      form.value.date,
     );

    //sending new log data to program page
    this.logFormSubmitted.emit(log);

    form.reset();
  }

  constructor() { }
  
}