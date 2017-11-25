import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { ProgramDataService } from '../program-data.service';

import {Program} from '../program';

import {Exercise} from '../exercise';
import {ExerciseFormComponent} from '../exercise-form/exercise-form.component';

import {Log} from '../log';
import {LogFormComponent} from '../log-form/log-form.component';

import { AuthService } from '../auth.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  program : Program;
  showAlert :boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private programDataService: ProgramDataService,
    private auth: AuthService
  ) { }


  ngOnInit() {
      console.log('on init program');
      this.showAlert = false;

      this.route.paramMap
          .switchMap((params: ParamMap) => {
              var name = params.get('name');
              if (name == null) {
                  name = "error";
              } 
             
              return this.programDataService.getProgram(name);
          }
              )
          .subscribe(program => {
              this.program = program;

          });
  }
    /*
  goBack(): void {
    this.location.back();
  }

  exerciseFormSubmitted(exercise:Exercise):void{
    if(this.auth.loggedIn()){
      this.showAlert = false;
      this.programDataService
      .createExercise(this.program.name, exercise)
      .then((exercise)=>{
        this.program.exercises.push(exercise);
      });
    }else{
      this.showAlert = true;
      console.log("you have to be logged in to create an exercise");
    }
    
  }

  logFormSubmitted(log:Log):void{
    if(this.auth.loggedIn()){
      this.showAlert = false;
      
      this.programDataService
      .createLog(this.program.name, log)
      .then((log)=>{
        this.program.logs.push(log);
      });
    }else{
      this.showAlert = true;
      
    }
  }
  */


}
