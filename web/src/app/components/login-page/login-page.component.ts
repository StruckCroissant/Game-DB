import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../common/user';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  credentials = {
    username: '',
    password: ''
  };

  userSubscription: Subscription | undefined;

  constructor(private userService: UserService, private userAuthService: AuthenticationService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  ngOnDestroy(): void{
    this.userSubscription?.unsubscribe();
  }

  loginUser(): boolean {
    this.userAuthService.authenticate(this.credentials, () => {
      this.gotoMainPage();
    });
    return false;
  }

  private gotoMainPage(): void {
    this.router.navigate(['/home']);
  }
}

