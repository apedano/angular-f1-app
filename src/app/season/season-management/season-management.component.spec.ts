import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonManagementComponent } from './season-management.component';

describe('SeasonManagementComponent', () => {
  let component: SeasonManagementComponent;
  let fixture: ComponentFixture<SeasonManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
