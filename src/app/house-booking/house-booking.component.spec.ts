import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseBookingComponent } from './house-booking.component';

describe('HouseBookingComponent', () => {
  let component: HouseBookingComponent;
  let fixture: ComponentFixture<HouseBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseBookingComponent]
    });
    fixture = TestBed.createComponent(HouseBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
