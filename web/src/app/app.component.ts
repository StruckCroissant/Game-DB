import {Component, OnInit} from '@angular/core';
import {UserInterface} from "./services/userInterface";
import {UserService} from "./services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title: string = "GameDB-web";

  public users: UserInterface[] | undefined;

  constructor(private userService: UserService){}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: UserInterface[]) =>{ this.users = response;},
      error: (error: HttpErrorResponse) => {alert(error.message);}
    });
  }
}
