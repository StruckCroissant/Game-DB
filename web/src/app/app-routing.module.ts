import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {GameDetailsPageComponent} from "./components/game-details-page/game-details-page.component";
import {SavedGamesPageComponent} from "./components/saved-games-page/saved-games-page.component";
import {SearchGamesPageComponent} from "./components/search-games-page/search-games-page.component";
import {MissingPageComponent} from "./components/missing-page/missing-page.component";

const routes: Routes = [{
  path: 'login-component', component: LoginPageComponent
}, {
  path: 'game-component', component: GameDetailsPageComponent
}, {
  path: 'saved-games-component', component: SavedGamesPageComponent
}, {
  path: 'search-games-component', component: SearchGamesPageComponent
},{
  path: 'missing-page-component', component: MissingPageComponent
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule{

}
