import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { GenericFormComponent } from 'src/app/shared/generic-form.component';
import { LabelAndValue } from 'src/app/shared/label-and-value.model';
import { Season } from 'src/app/shared/season.enum';
import { Team } from 'src/app/team/team.model';
import { TeamsService } from 'src/app/team/team.service';
import { Car } from '../car.model';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent extends GenericFormComponent<Car> implements OnInit {

  teams!: Team[];
  seasons: LabelAndValue[] = Season.allToLabelAndValue();


  constructor(private teamService: TeamsService, carService: CarService, router: Router, private currentRoute: ActivatedRoute) {
    super(carService, router);
  }

  protected emptyEntity(): Car {
    return new Car(Season.SEASONS[0], '', '', '', '');
  }


  protected initEntityForm(): Observable<FormGroup<any>> {
    return this.teamService.getAll().
      pipe(
        map((tArray: Team[]) => {
          console.log('Season.toLabelAndValue(this.entity.season)', Season.toLabelAndValue(this.entity.season));
          this.teams = tArray;
          return new FormGroup({
            season: new FormControl<Number>(this.entity.season,
              [Validators.required]),
            name: new FormControl(this.entity.name!,
              [Validators.required, Validators.minLength(3)]),
            powerUnit: new FormControl(this.entity.powerUnit!,
              [Validators.required, Validators.minLength(3)]),
            team: new FormControl<Team | null>(this.getTeamByLogo(tArray, this.entity.teamId),
              [Validators.required, Validators.minLength(3)]),
            imageName: new FormControl(this.entity.imageName!, [Validators.required]),
            // foundation: new FormControl(this.entity.foundation, [Validators.required]),

            // country: new FormControl(this.entity.nationality, Validators.required)
          });
        })
      );
  }

  private getTeamByLogo(tA: Team[], logoName: string): Team | null {
    let filtered: Team[] = tA.filter((t: Team) => t.logoName == logoName);
    return filtered.length == 0 ? null : filtered[0];
  }



  protected mapFormToEntity(): void {
    //FIXME: use the existing this.team instead
    this.entity.name = this.name?.value;
    this.entity.season = this.season?.value;
    this.entity.teamId = this.team?.value.logoName;
    this.entity.imageName = this.imageName?.value;
    this.entity.powerUnit = this.powerUnit?.value;
    console.log(this.entityForm);
  }


  get season() { return this.entityForm.get('season') }
  get name() { return this.entityForm.get('name') }
  get team() { return this.entityForm.get('team') }
  get imageName() { return this.entityForm.get('imageName') }
  get powerUnit() { return this.entityForm.get('powerUnit') }
  // get foundation() { return this.entityForm.get('foundation') }


  protected getRedirectUrlAfterSave(): any[] {
    return ['/cars'];
  }

  ngOnInit(): void {
    this.initEntity(this.currentRoute);
  }


}
