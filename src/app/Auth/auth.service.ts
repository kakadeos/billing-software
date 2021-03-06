import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StepperComponent } from '../intro-slider/stepper/stepper.component';

@Injectable({providedIn: "root"})
export class AuthService {

  private token : string;
  private isAuthenticated = false;
  private userId: string;
  private tokenTimer : any;
  private authStatusListener = new Subject<boolean>();
  private firstLoginListener = new Subject<string>();
  private msg: string;
  private isItFirstLogin: string;

  constructor( private http: HttpClient, private router: Router,
     private snackBar: MatSnackBar) {}

  createUser(email:string, password:string) {
    const authData : AuthData = {
      email: email, password: password
    };
    this.http.post<{message:string, result: object}>('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
        this.snackBar.open(response.message, null, {duration: 3000});
        this.router.navigate(['/login']);
    },
    (error) => {
      this.msg = error.error.message;
      if (this.msg === undefined) {
        this.msg = error.message;
      }
      this.snackBar.open(this.msg , null, {duration: 3000});
    });
  }

  login(email: string, password:string) {
    const authData : AuthData = {
      email: email, password: password
    };
    this.http.post<{token:string, expiresIn: number, userId: string, firstLogin: string}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresIn = response.expiresIn;
          this.setAuthtimer(expiresIn);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.isItFirstLogin = response.firstLogin;
          this.firstLoginListener.next(this.isItFirstLogin);
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationInDate = new Date (now.getTime() + expiresIn * 1000);
          this.saveAuthData(token, expirationInDate, this.userId, this.isItFirstLogin);
          this.router.navigate(['/dashboard']);
        }
    },
    (error) => {
      this.msg = error.error.message;
      if (this.msg === undefined) {
        this.msg = error.message;
      }
      this.snackBar.open(this.msg , null, {duration: 3000});
    });
  }

  getIsItFirstLogin() {
    return this.isItFirstLogin;
  }

  getFirtsLoginListener() {
    return this.firstLoginListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token : string, expirationInDate: Date, userId: string, firstLogin: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationInDate', expirationInDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstLogin', firstLogin);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationInDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstLogin');
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationInDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.isItFirstLogin = authInformation.firstLogin;
      this.setAuthtimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationInDate = localStorage.getItem('expirationInDate');
    const userid = localStorage.getItem('userId');
    const firstLogin = localStorage.getItem('firstLogin');
    if(!token || !expirationInDate) {
      return;
    }
    return { token: token, expirationInDate: new Date(expirationInDate), userId : userid, firstLogin: firstLogin};
  }

  private setAuthtimer(duartion: number) {
    this.tokenTimer = setTimeout(()=> {
      this.logout();
    },duartion * 1000);
  }


  changePassword(newPassword: string) {
    const password = {newPassword : newPassword};
    return this.http
    .post<{message: string, response: string}>('http://localhost:3000/api/user/changePassword', password)
    .subscribe((response) => {
      this.snackBar.open(response.message, null, {duration: 3000});
      this.logout();
    },
    (error) => {
      this.msg = error.error.message;
      if (this.msg === undefined) {
        this.msg = error.message;
      }
      this.snackBar.open(this.msg , null, {duration: 3000});
    });
}

forgotPassword(email: string) {
  const emailObject = {emailAddress: email};
  return this.http
    .post<{message: string, response: string}>('http://localhost:3000/api/user/forgotPassword', emailObject)
    .subscribe((response) => {
      this.snackBar.open(response.message, null, {duration: 3000});
      this.logout();
    },
    (error) => {
      this.msg = error.error.message;
      if (this.msg === undefined) {
        this.msg = error.message;
      }
      this.snackBar.open(this.msg , null, {duration: 3000});
    });
}

}
