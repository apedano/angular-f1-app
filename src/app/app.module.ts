import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
//PRIME-NG
import { MenubarModule } from 'primeng/menubar';

import { ButtonModule } from 'primeng/button';
import { TeamModule } from './team/team.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SeasonFormComponent } from './season/season-form/season-form.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { TrackFormComponent } from './track/track-form/track-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TrackListComponent } from './track/track-list/track-list.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    SeasonFormComponent,
    DriverFormComponent,
    TrackFormComponent,
    TrackListComponent
  ],
  imports: [
    InputNumberModule,
    TableModule,
    CardModule,
    InputTextModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    TeamModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
