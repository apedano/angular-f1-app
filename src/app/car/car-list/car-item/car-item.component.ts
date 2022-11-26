import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/team/team.model';
import { TeamsService } from 'src/app/team/team.service';
import { Car } from '../../car.model';
import { CarService } from '../../car.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {

  loading: boolean = true;
  teamObs!: Observable<Team>;

  constructor(private teamService: TeamsService, private carService: CarService, private router: Router, private currentRoute: ActivatedRoute) { }

  @Input()
  car!: Car;

  ngOnInit(): void {
    this.teamObs = this.teamService.getBylogoName(this.car.teamId);
  }

  onEditTriggered(): void {
    this.router.navigate(['./', this.car.id, 'edit'], { relativeTo: this.currentRoute });
  }

  onDeleteTriggered(): void {
    this.carService.delete(this.car).subscribe(() => this.router.navigate(['/teams']));
  }

  onTeamClick(carTeam: Team): void {
    console.log('team', carTeam.id);
  }

}
