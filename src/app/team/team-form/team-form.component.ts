import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { Team } from '../team.model';
import { TeamsService } from '../team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  team: Team = Team.empty();


  constructor(private teamService: TeamsService) { }

  teamForm!: FormGroup;

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      foundation: new FormControl(null, [Validators.required]),
      logo: new FormControl(null, [Validators.required]),
      country: new FormControl(null, Validators.required)
    });
  }



  onSubmit() {
    console.log(this.teamForm);
    const teamToUpdate = new Team(
      undefined,
      this.teamForm.get('name')?.value,
      this.teamForm.get('foundation')?.value,
      this.teamForm.get('logo')?.value,
      this.teamForm.get('country')?.value
    );
    console.log(teamToUpdate);
    this.teamService.createAndStore(teamToUpdate);
  }

  get name() { return this.teamForm.get('name'); }
  get foundation() { return this.teamForm.get('foundation'); }
  get logo() { return this.teamForm.get('logo'); }
  get country() { return this.teamForm.get('country'); }

}
