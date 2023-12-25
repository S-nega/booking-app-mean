import { Component, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { House } from './../../../models/house.js';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent {
  houses: any[] = [];
  searchLocation : string = '';
  numberOfRooms: number= 0;
  id: string = '';

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    // console.log('Успешно поприветствовали house')//не проходит при вызове из браузера
    // const houses = this.apiService.houseFunc();
    this.apiService.getHouses().subscribe((houses: any) => {
      // const houses = this.apiService.houseFunc();
      this.houses = houses.houses;
      console.log('Успешно поприветствовали house:', houses)
      
    });
  }

  search(){
    this.apiService.searchHouses(this.searchLocation, this.numberOfRooms ).subscribe((houses: any) => {
      this.houses = houses.houses;
      console.log('Результаты поиска');
      
    });
  }

  // getHouse(){
  //   this.apiService.getHouse(this.id).subscribe((houses: any) => {
  //     this.houses = houses.houses;
  //     console.log('Результаты поиска');
      
  //   });
  // }
}