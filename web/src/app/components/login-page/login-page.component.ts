import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../common/user';
import { ApiResponse } from '../../common/api-response';
import {map, Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {UserAuthService} from "../../services/user-auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  usernameInput: String = '';

  userSubscription: Subscription | undefined;

  constructor(private userService: UserService, private userAuthService: UserAuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  ngOnDestroy(): void{
    this.userSubscription?.unsubscribe();
  }

  loginUser(): void {
    this.userService.loginUser(this.usernameInput).subscribe({
      next: (response: ApiResponse) => {
        let inputUser: User = response.data as unknown as User;
        this.userAuthService.changeUser(inputUser);

        console.log(inputUser);
        this.gotoMainPage();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  private gotoMainPage(): void {
    this.router.navigate(['/navbar']);
  }
}

