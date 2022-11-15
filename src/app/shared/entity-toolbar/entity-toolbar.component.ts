import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericService } from '../generic.service';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-entity-toolbar',
  templateUrl: './entity-toolbar.component.html',
  styleUrls: ['./entity-toolbar.component.css'],
  providers: [ConfirmationService]
})
export class EntityToolbarComponent implements OnInit {

  @Input()
  entityName!: string;

  @Output()
  onEdit: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter<void>();

  msgs: Message[] = [];

  constructor(private confirmationService: ConfirmationService, private router: Router, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onEditClicked() {
    this.onEdit.emit();
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete <b> ' + this.entityName + '</b>?',
      header: 'Delete confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDelete.emit();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }



}
