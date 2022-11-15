import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityToolbarComponent } from './entity-toolbar.component';

describe('EntityToolbarComponent', () => {
  let component: EntityToolbarComponent;
  let fixture: ComponentFixture<EntityToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
