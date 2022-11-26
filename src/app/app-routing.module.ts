import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFormComponent } from './car/car-form/car-form.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { TeamFormComponent } from './team/team-form/team-form.component';
import { TrackFormComponent } from './track/track-form/track-form.component';
import { TrackListComponent } from './track/track-list/track-list.component';

const routes: Routes = [
  { path: '', component: TeamFormComponent },
  {
    path: 'tracks', children: [
      { path: '', component: TrackListComponent },
      { path: 'new', component: TrackFormComponent }, //we put it before the id so it will have precedence in the parse of the route
      // { path: ':id', component: TeamFormComponent },
      { path: ':id/edit', component: TrackFormComponent }
    ]
  },
  {
    path: 'cars', children: [
      { path: '', component: CarListComponent },
      { path: 'new', component: CarFormComponent }, //we put it before the id so it will have precedence in the parse of the route\
      { path: ':id/edit', component: CarFormComponent }
      // { path: ':id', component: TeamFormComponent },

    ]
  },
  {
    path: 'drivers', children: [
      { path: '', component: DriverFormComponent },
      // { path: 'new', component: TeamFormComponent }, //we put it before the id so it will have precedence in the parse of the route
      // { path: ':id', component: TeamFormComponent },
      // { path: ':id/edit', component: TeamFormComponent }
    ]
  }
  // { path: 'input-binding', component: InputBindingTutorialComponent},
  // { path: 'game', component: GameConsoleComponent},
  // { path: 'directive', component: DirectiveTutorialComponent},
  // { path: 'services', component: AccountManagerComponent},
  // { path: 'routing', component: RouterTutorialComponent},
  // { path: 'account/:id/:name/:status', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
