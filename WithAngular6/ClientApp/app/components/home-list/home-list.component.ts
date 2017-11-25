import { Component, OnInit } from '@angular/core';
import { ProgramDataService } from '../program-data.service';
import { Program } from '../program';
import { AuthService } from '../auth.service';
import {User} from '../user';

@Component({
  selector: 'home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [ProgramDataService]

})

export class HomeListComponent implements OnInit {
  constructor(private programDataService :ProgramDataService,
  private auth: AuthService) { }
    
  selectedProgram: Program;
  programs: Program[];


  ngOnInit() {
      this.getPrograms();
  }

  private getPrograms(): void {
      this.programDataService
          .getPrograms()
          .then(foundPrograms => {
              this.programs = foundPrograms;
          });
  }

  onSelect(program: Program): void {
      this.selectedProgram = program;
  }
    /*
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.programDataService.create(name)
          .then(program => {
              this.programs.push(program);
              this.selectedProgram = null;
          });
  }*/
    
}
