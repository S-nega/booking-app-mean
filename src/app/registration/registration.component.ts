import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      isAdmin: [false], // По умолчанию пользователь не является администратором
    });
  }

  ngOnInit(): void {
    // Ваши дополнительные действия при инициализации компонента
  }

  onSubmit() {
    console.log('Registration data:', this.registrationForm.value);

    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      this.apiService.registerUser(registrationData).subscribe(
        () => {
          console.log('Пользователь успешно зарегистрирован');
        },
        (error: any) => {
          console.error('Ошибка при регистрации пользователя:', error);
        }
      );
    }
  }
}
