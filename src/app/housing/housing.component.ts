import { Component, Input, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
// import { House } from '../models/house';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent {
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    console.log('Успешно поприветствовали house')//не проходит при вызове из браузера
    const houses = this.apiService.houseFunc();
    this.apiService.houseFunc().subscribe((houses: any) => {
      // const houses = this.apiService.houseFunc();
      console.log('Успешно поприветствовали house')
    });
  }


}