import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenericListComponent } from 'src/app/shared/generic-list.component';
import { Track } from '../track.model';
import { TrackService } from '../track.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent extends GenericListComponent<Track> {

  constructor(entityService: TrackService, private router: Router, private currentRoute: ActivatedRoute) {
    super(entityService);
  }

  onEditTriggered(track: Track) {
    this.router.navigate(['./', track.id, 'edit'], { relativeTo: this.currentRoute });
  }

  onDeleteTriggered(track: Track) {
    this.entityService.delete(track).subscribe(() => this.router.navigate(['/tracks']));
  }

}
