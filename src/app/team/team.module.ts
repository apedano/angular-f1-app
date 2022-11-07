import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ReactiveFormsModule } from '@angular/forms';


import { TeamFormComponent } from './team-form/team-form.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [TeamFormComponent],
    imports: [
        SharedModule,
        InputTextModule,
        CalendarModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSelectCountryModule,
        ReactiveFormsModule
    ],
    exports: [TeamFormComponent]
})
export class TeamModule { }