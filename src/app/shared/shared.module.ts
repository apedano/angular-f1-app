import { NgModule } from "@angular/core";
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ButtonModule } from 'primeng/button';


import { CountrySelectorComponent } from "./country-selector/country-selector.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from 'primeng/fileupload';
import { ImageSelectorComponent } from './image-selector/image-selector.component';


@NgModule({
    declarations: [CountrySelectorComponent, ImageSelectorComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectCountryModule.forRoot('en'),
        FileUploadModule,
        ButtonModule
    ],
    exports: [CountrySelectorComponent, ImageSelectorComponent]
})
export class SharedModule { }