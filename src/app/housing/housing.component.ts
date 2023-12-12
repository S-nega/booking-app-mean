import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.css']
})
export class HousingComponent {
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.apiService.houseFunc().subscribe((data: any) => {
    });
}
}
