import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirTicketsComponent } from './air-tickets.component';

describe('AirTicketsComponent', () => {
  let component: AirTicketsComponent;
  let fixture: ComponentFixture<AirTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirTicketsComponent]
    });
    fixture = TestBed.createComponent(AirTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
