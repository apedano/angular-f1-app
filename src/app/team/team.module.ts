import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { ReactiveFormsModule } from '@angular/forms';


import { TeamFormComponent } from './team-form/team-form.component';
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { TeamListComponent } from './team-list/team-list.component';
import { TeamItemComponent } from './team-list/team-item/team-item.component';


const teamsRoutes: Routes = [
    {
        path: 'teams', children: [
            { path: '', component: TeamListComponent },
            { path: 'new', component: TeamFormComponent }, //we put it before the id so it will have precedence in the parse of the route
            { path: ':id', component: TeamFormComponent },
            { path: ':id/edit', component: TeamFormComponent }
        ]
    }
];

@NgModule({
    declarations: [TeamFormComponent, TeamListComponent, TeamItemComponent],
    imports: [
        RouterModule.forChild(teamsRoutes),
        SharedModule,
        InputTextModule,
        CardModule,
        DataViewModule,
        CalendarModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSelectCountryModule,
        ReactiveFormsModule
    ],
    exports: [TeamFormComponent]
})
export class TeamModule { }