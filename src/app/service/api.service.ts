import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }
  houseFunc() {
    return this.http.get(`${this.apiUrl}/house`);
  }
}
