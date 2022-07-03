import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../common/user";
import {Observable, Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-navbar-partial',
  templateUrl: './navbar-partial.component.html',
  styleUrls: ['./navbar-partial.component.css']
})
export class NavbarPartialComponent implements OnInit {

  currentUser: User | unknown;
  currentUserSubscription: Subscription | undefined;

  sidebarClosed = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private userAuthService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.userAuthService.currentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }



  toggleSidebar(): void {
    console.log("toggled");
    this.sidebarClosed = !this.sidebarClosed;
  }

}
