import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm }  from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showSuccessMsg : boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.showSuccessMsg = false;
  }

  onRegister(form :NgForm) {
    var email = form.value.email;
    var username = form.value.username;
    var password = form.value.password;
    
    if(!email || !password || !username){
      //form invalid, do nothing
      return;
    }

    var user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    console.log("---onRegister called with credentials "+
    form.value.email+","+
    form.value.username + ","+    
    form.value.password);

    form.reset();
    this.auth.register(user);
    this.showSuccessMsg = true;

  } 

}
