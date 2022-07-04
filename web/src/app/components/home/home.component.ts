import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../common/user";
import {Observable, Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-navbar-partial',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
