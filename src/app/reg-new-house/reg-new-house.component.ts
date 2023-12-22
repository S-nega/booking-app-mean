import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-reg-new-house',
  templateUrl: './reg-new-house.component.html',
  styleUrls: ['../registration/registration.component.css'],
})
export class RegNewHouseComponent {
  regHouseForm: FormGroup;
  // imageSrc: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.regHouseForm = this.formBuilder.group({
      location: [''],
      hotelName: [''],
      houseType: [''],
      numberOfRooms: [''],
      dailyCost: [''],
      description: [''],
      contactInfo: [''],
    });
  }
  
  // readURL(event: Event): void {
  //   if (event.target.files && event.target.files[0]) {
  //       const file = event.target.files[0];
  //       const reader = new FileReader();
  //       reader.onload = e => this.imageSrc = reader.result;

  //       reader.readAsDataURL(file);
  //   }
  // }
  
  onSubmit() {
    console.log('reg-new-house component try to add house');
    if (this.regHouseForm.valid) {

      const houseData = this.regHouseForm.value;

      this.apiService.regNewHouseFunc(houseData).subscribe(
        () => {
          console.log('Дом успешно зарегистрирован:');
          // Вы можете выполнить дополнительные действия после успешной регистрации
        },
        (error: any) => {
          console.log(houseData);
          console.error('Ошибка при регстрации дома:', error);
          // Обработайте ошибку, например, показав сообщение об ошибке на фронтенде
        }
      );
    }
  }
}
