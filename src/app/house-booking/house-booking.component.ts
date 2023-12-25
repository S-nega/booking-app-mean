import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-house-booking',
  templateUrl: './house-booking.component.html',
  styleUrls: [
    '../housing/housing.component.css',
    './house-booking.component.css',
  ],
})
export class HouseBookingComponent {
  bookForm: FormGroup;
  userId: string;
  house: any;
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.userId = this.apiService.getUserId();

    this.bookForm = this.formBuilder.group({
      houseId: [''],
      startDate: [''],
      endDate: [''],
      userId:[this.userId]
    });
    
  }

  onInit(){
    this.apiService.getHouse(this.id).subscribe((house: any) => {
      // const houses = this.apiService.houseFunc();
      this.house = house;
      console.log('open', house)
      
    });
  }

  onSubmit() {
    console.log('reg-new-house component try to add house');
    if (this.bookForm.valid) {

      const bookingData = this.bookForm.value;

      this.apiService.bookHouse(bookingData).subscribe(
        () => {
          console.log('Дом успешно арендован:');
        },
        (error: any) => {
          console.log(bookingData);
          console.error('Ошибка при аренде дома:', error);
        }
      );
    }
  }
}
