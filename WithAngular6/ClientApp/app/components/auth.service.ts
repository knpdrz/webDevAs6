import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import { HttpErrorResponse } from '@angular/common/http';

interface AuthResponse {
  data:string[];
}

@Injectable()
export class AuthService {

    private apiBaseUrl = '/api/'; 

  constructor(private http: Http) {}


  //----------login
  public login(user: User) {
    const url = `${this.apiBaseUrl}/login`;
      this.http.post(url, user).subscribe(data => {
        this.saveToken(data.json()['token']);
        return true;
    },
    // Errors will call this callback instead:
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
       // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return false;
    });
  }

  //---------logout
  public logout(){
    //removing data from local storage
    this.removeToken();
  }


  //-----------------register
  public register(user: User) {
    const url = `${this.apiBaseUrl}/register`;
      this.http.post(url, user).subscribe(data => {
        console.log("== saving token "+data.json()['token']);
        this.saveToken(data.json()['token']);
        return true;
    },
    // Errors will call this callback instead:
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
       // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return false;
    });
  }


//----------------managing token
  private saveToken(token: string) {
    window.localStorage['work-out-token'] = token;
  }

  public getToken():string {
    if (window.localStorage['work-out-token']) {
      return window.localStorage['work-out-token'];
    } else {
      return '';
    }
  }

  private removeToken(){
    if (window.localStorage['work-out-token']) {
      window.localStorage.removeItem('work-out-token');
    } 
  }

//-----------check if user is logged in
  public loggedIn() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

//---------returns logged in user or nothing if there is none
  public currentUser(): User {
    if (this.loggedIn()) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));

      const user = new User();
      user.email = payload.email;
      user.username = payload.name;
      user.password = "dummy";
  
      return user;
    } else {
        const userNull = new User();
        userNull.email = "null";
        userNull.username = "null";
        userNull.password = "dummy";
        return userNull;
    }
  }
    
}