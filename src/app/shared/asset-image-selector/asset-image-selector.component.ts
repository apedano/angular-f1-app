import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-asset-image-selector',
  templateUrl: './asset-image-selector.component.html',
  styleUrls: ['./asset-image-selector.component.css']
})
export class AssetImageSelectorComponent implements ControlValueAccessor, OnInit {

  @Input('disabled')
  isDisabled: boolean = false;

  @Input()
  urlPartsArray!: string[][];

  inputValue: string = '';
  currentValue: string[] | null = [];
  isCurrentValueValid: boolean = false;

  onTouched = () => { };
  onChange = (imageUrls?: string[] | null) => { };

  touched: boolean = false;

  constructor(private httpClient: HttpClient) { }


  writeValue(obj: any): void {
    console.log('AssetImageSelectorComponent writing value', obj);
    this.markAsTouched();
    if (obj === null) {
      this.isCurrentValueValid = false;
      this.onChange();
      this.currentValue = null;
    } else {
      this.isCurrentValueValid = true;
      this.currentValue = obj;
      this.onChange(this.currentValue);
    }
    //FIXME: complete
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }

  // private fileExists(inputUrl: string): Observable<void | { result: Boolean, url: string }> {
  //   return this.httpClient.get(inputUrl).pipe(
  //     map(() => { true; inputUrl }),
  //     catchError(() => of({ result: false, url: inputUrl }))
  //   );
  // }

  private fileExists(inputUrl: string): Observable<void | { result: Boolean, url: string }> {
    return this.httpClient.get(inputUrl).pipe(
      map(() => { true; inputUrl }),
      catchError((err: HttpErrorResponse) => {
        console.log('fileExists error', err);
        let isStatusOk = err.status === 200;
        return of({ result: isStatusOk, url: inputUrl });
      })
    );
  }




  imageInAssets(url: string, callback: any): void {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }


  onInputChange(event: any): void {
    this.currentValue = [];
    this.isCurrentValueValid = false;
    let urlsToCheck: string[] = this.urlPartsArray
      .map((urlParts: string[]) => {
        return urlParts[0] + this.inputValue + urlParts[1];
      });
    let urlsExistObs: Observable<void | { result: Boolean, url: string }>[] = urlsToCheck
      .map(url => this.fileExists(url));
    forkJoin(urlsExistObs).subscribe((results: (void | { result: Boolean, url: string })[]) => {
      console.log('Exists call results', results)
      const valueToWrite = results.every(result => result?.result === true) ? urlsToCheck : null;
      console.log('writing value', valueToWrite);
      this.writeValue(valueToWrite);
    });
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }


}
