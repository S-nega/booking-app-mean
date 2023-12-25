import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['../registration/registration.component.css']
})
export class AuthorizationComponent implements OnInit {
  authorizationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.authorizationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    // Ваши дополнительные действия при инициализации компонента
  }

  onSubmit() {
    if (this.authorizationForm.valid) {
      const authorizationData = this.authorizationForm.value;

      this.apiService.authorizeUser(authorizationData).subscribe(
        () => {
          console.log('Пользователь успешно авторизован');
        },
        (error: any) => {
          console.error('Ошибка при авторизации пользователя:', error);
        }
      );
    }
  }
}
