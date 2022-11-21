import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  usernameInput: string = '';
  passwordInput: string = '';

  constructor(private userAuthService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(this.passwordInput);
    this.userAuthService.registerUser(
      {username: this.usernameInput, password: this.passwordInput}).subscribe({
      next: (response) => {
        if(response.status === 200){
          window.alert("Register success! You may now log in with your new account");
          this.gotoLoginPage();
        }
      },
      error: (err) => {
        if(err.status === 500){
          window.alert("Registration unsuccessful. User already exists");
        }
        console.log(err);
      }
    });
  }

  gotoLoginPage() {
    this.router.navigate(['/login']);
  }
}
