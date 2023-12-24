import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  houseFunc() {
    return this.http.get(`${this.apiUrl}/api/house`);
  }
  regNewHouseFunc(houseData: any) {
    console.log('try to add house');
    console.log(houseData);
    return this.http.post<any>(`${this.apiUrl}/api/house`, houseData);
  }
  getHouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/house`);
  }
  getHouse(houseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/house/${houseId}`);
  }
  updateHouse(houseId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/house/${houseId}`,
      updatedData
    );
  }
  deleteHouse(houseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/house/${houseId}`);
  }

  //Booking
  bookHouse(bookingData: any) {
    console.log('try to add house');
    console.log(bookingData);
    return this.http.post<any>(`${this.apiUrl}/api/housebooking`, bookingData);
  }
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/housebooking`);
  }
  getBooking(bookingId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/housebooking/${bookingId}`);
  }
  updateBooking(bookingId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/housebooking/${bookingId}`,
      updatedData
    );
  }
  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/housebooking/${bookingId}`
    );
  }

  searchHouses(location: string, numberOfRooms: number): Observable<any[]> {
    const params = new HttpParams()
      .set('location', location)
      .set('numberOfRooms', numberOfRooms.toString());

    return this.http.get<any[]>(`${this.apiUrl}/api/house/search`, { params });
  }
  showLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/house/locations`);
  }
}
