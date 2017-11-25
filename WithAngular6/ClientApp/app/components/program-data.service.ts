import { Component, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {AuthService} from './auth.service';

import { Program } from './program';
import { Exercise } from './exercise';
import { Log } from './log';


@Injectable()
export class ProgramDataService {
    private theBaseUrl :String;
    private apiBaseUrl = 'api/programs';
  
    constructor(private http: Http, private auth: AuthService,
        @Inject('BASE_URL') baseUrl: string) {
        this.theBaseUrl = baseUrl;
    }

   
  public getPrograms(): Promise<Program[]> {
      const someParam: number = 1;
      const url = this.theBaseUrl + "" + this.apiBaseUrl;
     // const url: string = `${this.apiBaseUrl}`;

      return this.http
          .get(url)
          .toPromise()
          .then(response => response.json() as Program[])
          .catch(this.handleError);
  }

  getProgram(name :string): Promise<Program>{
      const url = this.theBaseUrl + "" + this.apiBaseUrl + `/${name}`;

      return this.http.get(url)
      .toPromise()
          .then(program => {
              console.log("program = ");
              console.log(program);
              return program.json() as Program;
          })
      .catch(this.handleError);
  }

  getProgram2(name :string): Promise<Program>{
    return this.getPrograms()
      .then(programs => programs.find(program => program.name === name))
      .catch(this.handleError);
  }
  

  private handleError(error: any): Promise<any>{
    console.error('sth has gone wrong', error);
    
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  create(name: string): Promise<Program> {
    const url = this.apiBaseUrl+"programs";
    const data = JSON.stringify({name: name});
  
    const pheaders = new Headers();
    pheaders.append('Content-Type', 'application/json');
    pheaders.append('Authorization', 'Bearer ' +
            this.auth.getToken());
       
    var options = new RequestOptions({headers: pheaders});

    return this.http
      .post(url, data,options)
      .toPromise()
      .then(res => res.json() as Program)
      .catch(this.handleError);
  }

  //------------------exercises
  createExercise(programName: string, exercise:Exercise): Promise<Exercise> {
    const url = this.apiBaseUrl+"programs/"+programName+"/exercises";
    const data = JSON.stringify({
          name: exercise.name, 
          repstime: exercise.repstime,
          sets: exercise.sets,
          description: exercise.description });
  
    const pheaders = new Headers();
    pheaders.append('Content-Type', 'application/json');
    pheaders.append('Authorization', 'Bearer ' +
            this.auth.getToken());
       
    var options = new RequestOptions({headers: pheaders});

    return this.http
      .post(url, data, options)
      .toPromise()
      .then(res => res.json() as Exercise)
      .catch(this.handleError);
  }

  //------------------logs
  createLog(programName: string, log:Log): Promise<Log> {
    console.log('saving log with name: '+this.auth.currentUser().username + " email = "+this.auth.currentUser().email);
    const url = this.apiBaseUrl+"programs/"+programName+"/logs";
    const data = JSON.stringify({
      username: "", 
      date: log.date });
  
    const pheaders = new Headers();
    pheaders.append('Content-Type', 'application/json');
    pheaders.append('Authorization', 'Bearer ' +
            this.auth.getToken());
       
    var options = new RequestOptions({headers: pheaders});

    return this.http
      .post(url, data, options)
      .toPromise()
      .then(res => res.json() as Log)
      .catch(this.handleError);
  }
    
}
