import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
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

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

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
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
