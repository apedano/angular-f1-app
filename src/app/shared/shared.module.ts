import { NgModule } from "@angular/core";
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ButtonModule } from 'primeng/button';


import { CountrySelectorComponent } from "./country-selector/country-selector.component";


@NgModule({
    declarations: [CountrySelectorComponent],
    imports: [
        MatSelectCountryModule.forRoot('en'),
        ButtonModule
    ],
    exports: [CountrySelectorComponent]
})
export class SharedModule { }