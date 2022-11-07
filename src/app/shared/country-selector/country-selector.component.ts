import { Country, MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements OnInit {

  private readonly emptyCountry = {
    name: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: ''
  };

  @Input('initial')
  selectedCountry!: Country;


  @ViewChild('c') countrySelector!: MatSelectCountryComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyOnCountry(event: any) {
    // console.log(event);
    // console.log(this.countrySelector);

  }

  onCountrySelected(country: Country) {
    // this.teamForm.controls['country'].setValue(country);
    console.log(country);
  }

  onClearCountry() {
    // this.teamForm.get('country')!.setValue(null);
    this.countrySelector.value = this.emptyCountry;
    //this.countrySelector.inputElement.value = "";

  }

}
