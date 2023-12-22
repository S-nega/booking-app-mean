import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNewHouseComponent } from './reg-new-house.component';

describe('RegNewHouseComponent', () => {
  let component: RegNewHouseComponent;
  let fixture: ComponentFixture<RegNewHouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegNewHouseComponent]
    });
    fixture = TestBed.createComponent(RegNewHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
