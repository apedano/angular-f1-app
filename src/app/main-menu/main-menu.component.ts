import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Teams',
        items: [
          { label: 'All', icon: 'pi pi-fw pi-bars', routerLink: "/teams/" },
          { label: 'New', icon: 'pi pi-fw pi-plus', routerLink: "/teams/new" },
          { label: 'Open' },
          { label: 'Quit' },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              { label: 'Project' },
              { label: 'Other' },
            ]
          }
        ]
      },
      {
        label: 'Tracks',
        items: [
          { label: 'All', icon: 'pi pi-fw pi-bars', routerLink: "/tracks/" },
          { label: 'New', icon: 'pi pi-fw pi-plus', routerLink: "/tracks/new" }
        ]
      },
      {
        label: 'Drivers',
        items: [
          { label: 'All', icon: 'pi pi-fw pi-bars', routerLink: "/drivers/" },
          { label: 'New', icon: 'pi pi-fw pi-plus', routerLink: "/tracks/new" }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }
}
