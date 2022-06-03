import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../common/user';
import {map} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  user: User | unknown;

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  printUserDetails() {
    this.service.getUserByUsername(this.username).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

