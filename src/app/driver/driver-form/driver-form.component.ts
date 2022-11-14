import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {

  driverForm!: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.driverForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      state: new FormControl(null, [Validators.required]),
      firstYear: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required])


    });
  }

  get name() { return this.driverForm.get('name'); }
  get image() { return this.driverForm.get('image'); }
  get state() { return this.driverForm.get('state'); }

  onSubmit(): void { }

}
