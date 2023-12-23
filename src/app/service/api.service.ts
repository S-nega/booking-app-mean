import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  houseFunc() {
    return this.http.get(`${this.apiUrl}/api/house`);
  }
  regNewHouseFunc(houseData:any) {
    return this.http.post<any>(`${this.apiUrl}/api/house`, houseData);
  }
  getHouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/house`);
  }
  getHouse(houseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/house/${houseId}`);
  }
  updateHouse(houseId: string,  updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/house/${houseId}`, updatedData);
  }
  deleteHouse(houseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/house/${houseId}`);
  }
  houseSearchFunc(houseData:any){
    return this.http.get<any>(`${this.apiUrl}/api/house`, houseData);
  }
}