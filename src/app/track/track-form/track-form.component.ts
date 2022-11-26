import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GenericFormComponent } from 'src/app/shared/generic-form.component';
import { Track } from '../track.model';
import { TrackService } from '../track.service';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.css']
})
export class TrackFormComponent extends GenericFormComponent<Track> implements OnInit {


  constructor(trackService: TrackService, router: Router, private activatedRoute: ActivatedRoute) {
    super(trackService, router);
  }

  ngOnInit(): void {
    this.initEntity(this.activatedRoute);
  }


  protected emptyEntity(): Track {
    return new Track();
  }

  protected initEntityForm(): Observable<FormGroup<any>> {
    return of(new FormGroup({
      name: new FormControl(this.entity.name, [Validators.required, Validators.minLength(3)]),
      state: new FormControl(this.entity.country, [Validators.required]),
      length: new FormControl(this.entity.length, [Validators.required]),
      firstYear: new FormControl(this.entity.firstYear, [Validators.required]),
      imageName: new FormControl(this.entity.imageName, [Validators.required])
    }))
  }

  protected mapFormToEntity(): void {
    this.entity.name = this.name?.value;
    this.entity.country = this.state?.value;
    this.entity.length = this.length?.value;
    this.entity.imageName = this.imageName?.value;
    this.entity.firstYear = this.firstYear?.value;
  }
  protected getRedirectUrlAfterSave(): any[] {
    return ['tracks']
  }




  get name() { return this.entityForm.get('name'); }
  get length() { return this.entityForm.get('length'); }
  get imageName() { return this.entityForm.get('imageName'); }
  get state() { return this.entityForm.get('state'); }
  get firstYear() { return this.entityForm.get('firstYear'); }











}
