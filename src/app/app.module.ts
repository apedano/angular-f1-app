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



@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent
  ],
  imports: [
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
