import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamFormComponent } from './team/team-form/team-form.component';

const routes: Routes = [
  { path: '', component: TeamFormComponent },
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
