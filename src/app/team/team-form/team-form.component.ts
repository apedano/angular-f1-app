import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Country, MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { Team } from '../team.model';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  team: Team = Team.empty();
  private selectedCountry!: Country;
  @ViewChild('c') countrySelector!: MatSelectCountryComponent;



  constructor() { }

  teamForm!: FormGroup;

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      foundation: new FormControl(null, [Validators.required]),
      logo: new FormControl(null, [Validators.required]),
      country: new FormControl(null, Validators.required)
    });
  }

  // onSelectLogo(event: any) {
  //   const logoFormControl = this.teamForm.controls['logo'];
  //   console.log(event);
  //   let logo: File = event.files[0];
  //   logoFormControl.setValue(logo);
  //   this.team.logo = logo;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(logo);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //   };
  // }

  // onRemoveLogo(event: any) {
  //   this.team.logo = null;
  //   const logoFormControl = this.teamForm.controls['logo'];
  //   logoFormControl.setValue(null);
  // }



  onSubmit() {
    console.log(this.teamForm);

  }

  get name() { return this.teamForm.get('name'); }
  get foundation() { return this.teamForm.get('foundation'); }
  get logo() { return this.teamForm.get('logo'); }
  get country() { return this.teamForm.get('country'); }

}
