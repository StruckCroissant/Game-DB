import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SavedGamesPageComponent } from './components/saved-games-page/saved-games-page.component';
import { SearchGamesPageComponent } from './components/search-games-page/search-games-page.component';
import { GameDetailsPageComponent } from './components/game-details-page/game-details-page.component';
import { MissingPageComponent } from './components/missing-page/missing-page.component';
import { NavbarPartialComponent } from './components/navbar-partial/navbar-partial.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SavedGamesPageComponent,
    SearchGamesPageComponent,
    GameDetailsPageComponent,
    MissingPageComponent,
    NavbarPartialComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    BrowserModule,
    HttpClientModule,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
