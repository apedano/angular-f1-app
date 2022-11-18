import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { GenericListComponent } from 'src/app/shared/generic-list.component';
import { Team } from '../team.model';
import { TeamsService } from '../team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent extends GenericListComponent<Team> {

  constructor(teamService: TeamsService) {
    super(teamService);
  }


}
