import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title: string = "GameDB-web";

  constructor(){}

  ngOnInit() {

  }
}
