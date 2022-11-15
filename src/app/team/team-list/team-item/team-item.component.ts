import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../team.model';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {

  @Input()
  team!: Team;
  teamAlpha2Code: string | undefined;
  flagUrlTemplate!: string;
  logoUrlTemplate!: string;

  constructor(private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.teamAlpha2Code = this.team.nationality?.alpha2Code;
    this.flagUrlTemplate = 'assets/svg-country-flags/svg/' + this.team.nationality?.alpha2Code.toLowerCase() + '.svg';
    this.logoUrlTemplate = 'assets/img/teams/' + this.team.logoName! + '.jpg';
  }

  onEditTriggered() {
    this.router.navigate(['./', this.team.id, 'edit'], { relativeTo: this.currentRoute });
  }

  onDeleteTriggered() {
    console.log('Delete', this.team.id);
  }

}
