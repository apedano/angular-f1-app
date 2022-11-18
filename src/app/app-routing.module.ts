import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
