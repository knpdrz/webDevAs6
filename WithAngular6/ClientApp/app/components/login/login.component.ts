import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm }  from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onLogin(form :NgForm) {
    var email = form.value.email;
    var password = form.value.password;
    
    if(!email || !password){
      return;
    }
    var user = new User();
    user.email = email;
    user.username = "dummy";
    user.password = password;

    console.log("---onLogin called with credentials "+
    form.value.email+","+
    form.value.password);

    form.reset();
    this.auth.login(user);
  }

  
}
