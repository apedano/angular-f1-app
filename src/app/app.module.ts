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
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { TrackFormComponent } from './track/track-form/track-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TrackListComponent } from './track/track-list/track-list.component';
import { TableModule } from 'primeng/table';
import { CarFormComponent } from './car/car-form/car-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { CarListComponent } from './car/car-list/car-list.component';
import { CarItemComponent } from './car/car-list/car-item/car-item.component';
import { DataViewModule } from 'primeng/dataview';



@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    DriverFormComponent,
    TrackFormComponent,
    TrackListComponent,
    CarFormComponent,
    CarListComponent,
    CarItemComponent
  ],
  imports: [
    InputNumberModule,
    DropdownModule,
    DataViewModule,
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
