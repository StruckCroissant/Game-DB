import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title: string = "GameDB-web";

  constructor(private authService: AuthenticationService, private router: Router, private http: HttpClient) {
    this.authService.authenticate(undefined, undefined);

  }

  ngOnInit() {

  }
}
