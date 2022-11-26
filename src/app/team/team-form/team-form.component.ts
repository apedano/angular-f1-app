import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Team } from '../team.model';
import { TeamsService } from '../team.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Observer, of } from 'rxjs';
import { GenericFormComponent } from '../../shared/generic-form.component'

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent extends GenericFormComponent<Team> implements OnInit {


  constructor(teamService: TeamsService, router: Router, private currentRoute: ActivatedRoute) {
    super(teamService, router)
  }

  protected emptyEntity(): Team {
    return new Team();
  }

  protected initEntityForm(): Observable<FormGroup<any>> {
    return of(new FormGroup({
      name: new FormControl(this.entity.name!,
        [Validators.required, Validators.minLength(3)]),
      foundation: new FormControl(this.entity.foundation, [Validators.required]),
      logo: new FormControl(this.entity.logoName!, [Validators.required]),
      country: new FormControl(this.entity.nationality, Validators.required)
    }))
  }
  protected mapFormToEntity(): void {
    //FIXME: use the existing this.team instead
    this.entity.name = this.name?.value;
    this.entity.foundation = this.foundation?.value;
    this.entity.logoName = this.logo?.value;
    this.entity.nationality = this.country?.value;
    //console.log(this.teamForm);
  }

  get name() { return this.entityForm.get('name') }
  get logo() { return this.entityForm.get('logo') }
  get country() { return this.entityForm.get('country') }
  get foundation() { return this.entityForm.get('foundation') }


  protected getRedirectUrlAfterSave(): any[] {
    return ['/teams'];
  }

  ngOnInit(): void {
    this.initEntity(this.currentRoute);
  }

}
