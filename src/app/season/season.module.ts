import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { SeasonManagementComponent } from './season-management/season-management.component';



@NgModule({
  declarations: [
    SeasonManagementComponent
  ],
  imports: [
    CommonModule,
    DropdownModule
  ]
})
export class SeasonModule { }
