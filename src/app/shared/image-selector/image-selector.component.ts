import { Component, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: ImageSelectorComponent
  //   }
  // ]
})
export class ImageSelectorComponent implements ControlValueAccessor, OnInit {

  touched: boolean = false;
  disabled: boolean = false;

  onChange = (fileContent: string | ArrayBuffer | null) => { };

  onTouched = () => { };

  @ViewChild('imageSelector', { static: true }) imageUploader!: ImageSelectorComponent;

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }


  writeValue(fileContent: string | ArrayBuffer | null): void {
    console.log('ImageSelectorComponent.writeValue called');
    this.markAsTouched();
    this.onChange(fileContent);
    console.log('ImageSelectorComponent.writeValue touched:' + this.touched)
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

  ngOnInit(): void {
  }

  onSelectLogo(event: any) {
    // const logoFormControl = this.teamForm.controls['logo'];
    console.log(event);
    let logo: File = event.files[0];
    // logoFormControl.setValue(logo);
    // this.team.logo = logo;
    const reader = new FileReader();
    reader.readAsDataURL(logo);
    reader.onload = () => {
      const content: string | ArrayBuffer | null = reader.result;
      this.writeValue(content);
    };
  }


  /*
  https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
  //load src and convert to a File instance object
//work for any type of src, not only image src.
//return a promise that resolves with a File instance

function srcToFile(src, fileName, mimeType){
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
}
  */

  onRemoveLogo(event: any) {
    this.writeValue(null);
    // this.team.logo = null;
    // const logoFormControl = this.teamForm.controls['logo'];
    // logoFormControl.setValue(null);
  }

  markAsTouched() {
    console.log('ImageSelectorComponent.markAsTouched called')
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
