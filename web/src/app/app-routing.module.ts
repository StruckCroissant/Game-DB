import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {GameDetailsPageComponent} from "./components/game-details-page/game-details-page.component";
import {SavedGamesPageComponent} from "./components/saved-games-page/saved-games-page.component";
import {SearchGamesPageComponent} from "./components/search-games-page/search-games-page.component";
import {MissingPageComponent} from "./components/missing-page/missing-page.component";
import {NavbarPartialComponent} from "./components/navbar-partial/navbar-partial.component";

const routes: Routes = [{
  path: 'login', component: LoginPageComponent
}, {
  path: 'game-details', component: GameDetailsPageComponent
}, {
  path: 'saved-games', component: SavedGamesPageComponent
}, {
  path: 'search-games', component: SearchGamesPageComponent
},{
  path: 'missing-page', component: MissingPageComponent
},{
  path: 'navbar', component: NavbarPartialComponent
},{
  path:'', redirectTo:'login', pathMatch: 'full'
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule{

}
