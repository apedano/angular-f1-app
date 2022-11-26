import { Component, OnInit } from '@angular/core';
import { first, map, Observable, of, Subscription, tap } from 'rxjs';
import { GenericListComponent } from 'src/app/shared/generic-list.component';
import { Team } from 'src/app/team/team.model';
import { TeamsService } from 'src/app/team/team.service';
import { Car } from '../car.model';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent extends GenericListComponent<Car> {

  teams!: Team[];
  isLoading: boolean = true;
  allTeamsSub!: Subscription;

  constructor(carService: CarService, private teamService: TeamsService) {
    super(carService);
  }

  protected override onDestroy(): void {
    this.allTeamsSub.unsubscribe();
  }


  protected override onEntitiesLoaded(): void {
    this.allTeamsSub = this.teamService.getAll().subscribe((teamArray: Team[]) => {
      this.teams = teamArray;
      this.isLoading = false;
    })
  };





}
