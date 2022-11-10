import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { Team } from '../team.model';
import { TeamsService } from '../team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {

  teams: Team[] = [];
  loading: boolean = true;
  teamsSubscription!: Subscription;

  constructor(private teamService: TeamsService) { }


  ngOnInit(): void {
    this.teamsSubscription = this.teamService.teamsSubject.subscribe(teamArray => {
      this.teams = teamArray;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.teamsSubscription.unsubscribe();
  }



}
