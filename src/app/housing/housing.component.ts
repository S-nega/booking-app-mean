import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { House } from './../../../models/house.js';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent{
  // houseSearchForm: FormGroup;
  public housesList:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    // this.houseSearchForm = this.formBuilder.group({
    //   location: [''],
    //   numberOfRooms: [''],
    //   arrival-day: [''],
    //   departer-day: [''],
    // });
  }

  ngOnInit() {
    console.log('Успешно поприветствовали house')//не проходит при вызове из браузера
    
    // this.housesList = this.apiService.houseFunc();
    this.apiService.houseFunc().subscribe((data: any) => {
      this.housesList = data; //переменная приходит в браузер пустая
      console.log('Успешно поприветствовали house')// не проходит при вызове из браузера
    });
  }

  //не работатет поиск
  // onSubmit(){
  //   console.log('reg-new-house component try to add house');
  //   if (this.houseSearchForm.valid) {

  //     const houseParametrs = this.houseSearchForm.value;

  //     this.apiService.houseSearchFunc(houseParametrs).subscribe(
  //       () => {
  //         console.log('Дом успешно зарегистрирован:');
  //         // Вы можете выполнить дополнительные действия после успешной регистрации
  //       },
  //       (error: any) => {
  //         console.log(houseParametrs);
  //         console.error('Ошибка при регстрации дома:', error);
  //         // Обработайте ошибку, например, показав сообщение об ошибке на фронтенде
  //       }
  //     );
  //   }
  // }
}