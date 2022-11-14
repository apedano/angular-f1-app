import { Component, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements ControlValueAccessor, OnInit {

  touched: boolean = false;
  disabled: boolean = false;
  minYear: number = 1950;
  maxYear: number = 2022;
  selectedYear: number = this.minYear;

  onChange = (year: number | null) => { };

  onTouched = () => { };

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }


  registerOnChange(onChangeFn: any): void {
    this.onChange = onChangeFn;
  }

  registerOnTouched(onTouchedFn: any): void {
    this.onTouched = onTouchedFn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  onYearChange(event: any) {
    this.writeValue(this.selectedYear);
  }

  writeValue(obj: any): void {
    this.markAsTouched();
    this.selectedYear = obj;
    this.onChange(this.selectedYear);
  }

  ngOnInit(): void {
  }

  markAsTouched() {
    console.log('ImageSelectorComponent.markAsTouched called')
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
