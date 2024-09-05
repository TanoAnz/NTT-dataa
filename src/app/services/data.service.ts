import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://gorest.co.in/public/v2';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProtectedData(endpoint: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers });
  }
  addData(endpoint:string, data: any): Observable<any> {
    const token= this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers: headers });
  }
  deleteData(endpoint:string): Observable<any> {
    const token= this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${endpoint}`, { headers: headers });
  }
}