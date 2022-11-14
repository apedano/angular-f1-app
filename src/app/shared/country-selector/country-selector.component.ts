import { Country, MatSelectCountryComponent } from '@angular-material-extensions/select-country';
import { Component, forwardRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: forwardRef(() => CountrySelectorComponent)
  //   }
  // ]
})
export class CountrySelectorComponent implements ControlValueAccessor, OnInit {

  private readonly emptyCountry = {
    name: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    callingCode: ''
  };

  @Input('disabled')
  isDisabled: boolean = false;

  onTouched = () => { };
  onChange = (selectedCountry?: Country) => { };

  touched: boolean = false;

  @Input('initial')
  selectedCountry?: Country;

  //we need it because we use it in the onInit
  @ViewChild('c', { static: true }) countrySelector!: MatSelectCountryComponent;

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    if (this.selectedCountry) {
      this.writeValue(this.selectedCountry);
    }
  }

  /**
   * this method is called by the Forms module to write a value into a form control
   * @param obj 
   */
  writeValue(obj?: Country): void {
    console.log('CountrySelectorComponent.writeValue called with:' + obj);
    this.markAsTouched();
    this.countrySelector.value = obj ? obj : this.emptyCountry;
    this.selectedCountry = obj;
    this.onChange(obj);
  }

  /**
   * When a form value changes due to user input, we need to report the value back to the parent form. 
   * This is done by calling a callback, that was initially registered with the control using the registerOnChange methodø
   * @param fn 
   */
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  /**
   * When the user first interacts with the form control, the control is considered to have the status touched, which is useful for styling. 
   * In order to report to the parent form that the control was touched, we need to use a callback registered using the registerOnToched method
   * @param fn 
   */
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  /**
   * form controls can be enabled and disabled using the Forms API. This state can be transmitted to the form control via the setDisabledState method
   * @param isDisabled 
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyOnCountry(event: any) {
    // console.log(event);
    // console.log(this.countrySelector);

  }

  onCountrySelected(country: Country) {
    this.writeValue(country);
  }

  onClearCountry() {
    //this.writeValue(this.emptyCountry);
    this.writeValue();

  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
