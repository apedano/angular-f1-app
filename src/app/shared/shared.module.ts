import { NgModule } from "@angular/core";
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ButtonModule } from 'primeng/button';


import { CountrySelectorComponent } from "./country-selector/country-selector.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [CountrySelectorComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectCountryModule.forRoot('en'),
        ButtonModule
    ],
    exports: [CountrySelectorComponent]
})
export class SharedModule { }