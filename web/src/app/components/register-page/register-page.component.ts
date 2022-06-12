import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../services/user-auth.service";
import {User} from "../../common/user";
import {ApiResponse} from "../../common/api-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  usernameInput: string | unknown;
  passwordInput: string | unknown;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.userAuthService.registerUser(
      new User(this.usernameInput as string, this.passwordInput as string)).subscribe({
      next: (response: ApiResponse) => {
        if(response.registerSuccess){
          window.alert("Register success! You may now log in with your new account");
          this.gotoLoginPage();
        } else {
          window.alert("Registration unsuccessful. User already exists");
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  gotoLoginPage() {
    this.router.navigate(['/login']);
  }
}
