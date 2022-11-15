import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Team } from '../team.model';
import { TeamsService } from '../team.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  team: Team = Team.empty();
  id!: string;
  loading: boolean = true;


  constructor(private teamService: TeamsService, private router: Router, private currentRoute: ActivatedRoute) { }

  teamForm!: FormGroup;

  ngOnInit(): void {
    this.currentRoute.params
      .subscribe(
        (updatedParams: Params) => {
          if (updatedParams['id']) {
            let id = updatedParams['id'];
            this.teamService.getById(id).subscribe(team => {
              this.team = team;
              this.onTeamLoaded();
            });
          } else {
            this.onTeamLoaded();
          }
        }
      );
  }

  onTeamLoaded() {
    this.teamForm = new FormGroup({
      name: new FormControl(this.team.name,
        [Validators.required, Validators.minLength(3)]),
      foundation: new FormControl(this.team.foundation, [Validators.required]),
      logo: new FormControl(this.team.logoName!, [Validators.required]),
      country: new FormControl(this.team.nationality, Validators.required)
    });

    this.loading = false;
  }



  onSubmit() {
    //FIXME: use the existing this.team instead

    this.team.name = this.name?.value;
    this.team.foundation = this.foundation?.value;
    this.team.logoName = this.logo?.value;
    this.team.nationality = this.country?.value;
    console.log(this.teamForm);
    this.teamService.createOrUpdate(this.team).subscribe(this.createAndStoreObserver);
  }

  private createAndStoreObserver: Partial<Observer<any>> = {
    next: () => {
      this.router.navigate(['/teams']);
    },
    error: err => {
      console.log(err);
    }
  }

  get name() { return this.teamForm.get('name') }
  get logo() { return this.teamForm.get('logo') }
  get country() { return this.teamForm.get('country') }
  get foundation() { return this.teamForm.get('foundation') }

}
