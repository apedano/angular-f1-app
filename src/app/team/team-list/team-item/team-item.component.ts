import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Team } from '../../team.model';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {

  @Input()
  team!: Team;
  teamThumbnail: any;
  teamAlpha2Code: string | undefined;
  flagUrlTemplate!: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.teamThumbnail = this.sanitizer.bypassSecurityTrustUrl('' + this.team.logo);
    this.teamAlpha2Code = this.team.nationality?.alpha2Code;
    this.flagUrlTemplate = 'assets/svg-country-flags/svg/' + this.team.nationality?.alpha2Code.toLowerCase() + '.svg'
    // let logo: any = this.team.logo;
    // // logoFormControl.setValue(logo);
    // // this.team.logo = logo;
    // const reader = new FileReader();
    // reader.readAsDataURL(logo);
    // reader.onload = () => {
    //   this.teamThumbnail = this.sanitizer.bypassSecurityTrustUrl('' + reader.result);
    // };
  }

}
