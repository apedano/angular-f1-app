import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.css']
})
export class TrackFormComponent implements OnInit {

  trackForm!: FormGroup;
  imageUrl!: string;
  imageExists: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.trackForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      state: new FormControl(null, [Validators.required]),
      length: new FormControl(null, [Validators.required]),
      firstYear: new FormControl(null, [Validators.required]),
      imageName: new FormControl(null, [Validators.required])
    });


  }

  onFirstYearChange(event: any) {
    console.log('FirstYear' + this.trackForm.get('firstYear')?.value);
  }

  imageInAssets(url: string, callback: any): void {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }



  onImageNameChange(event: any): void {
    console.log(event, this.trackForm.get('imageName'));
    this.imageInAssets('assets/img/tracks/' + this.trackForm.get('imageName')?.value + '_large.png', (exists: boolean) => {
      this.imageExists = exists
      if (this.imageExists) {
        this.imageUrl = 'assets/img/tracks/' + this.trackForm.get('imageName')?.value + '_large.png'
      }
    });
  }







  get name() { return this.trackForm.get('name'); }
  get length() { return this.trackForm.get('length'); }
  get imageName() { return this.trackForm.get('imageName'); }
  get state() { return this.trackForm.get('state'); }
  get firstYear() { return this.trackForm.get('firstYear'); }

  onSubmit(): void { }

}
