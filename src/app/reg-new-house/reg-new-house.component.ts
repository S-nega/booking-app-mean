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
  selectedImage: File | null = null; // Установим начальное значение

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
      image: []
    });
  }

  onImageSelected(event: any) {
    const imageFile = event.target.files[0];
    this.selectedImage = imageFile;
    this.regHouseForm.get('image')?.setValue(imageFile);
  }

  onSubmit() {
    console.log('reg-new-house component try to add house');
    if (this.regHouseForm.valid) {
      const houseData = this.regHouseForm.value;

      const formData = new FormData();
      Object.keys(houseData).forEach(key => {
        formData.append(key, houseData[key]);
      });

      this.apiService.regNewHouseFunc(formData).subscribe(
        () => {
          console.log('Дом успешно зарегистрирован:');
          // Вы можете выполнить дополнительные действия после успешной регистрации
        },
        (error: any) => {
          console.error('Ошибка при регистрации дома:', error);
        }
      );
    }
  }
}
