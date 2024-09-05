import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token'
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private apiUrl1 = 'https://gorest.co.in/public/v2/';


  constructor(private http: HttpClient, private router: Router) {}

  saveToken(token: string): void {
    if(typeof window!== 'undefined' && localStorage){
      return localStorage.setItem(this.tokenKey, token);
    } else {
      throw new Error('localStorage non è accessibile')
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem(this.tokenKey);
    } else {
      throw new Error('localStorage non è accessibile')
    }
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  verifyToken(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      return this.http.get(this.apiUrl , { headers });
    } else {
      throw new Error('Token non trovato');
    }
  }
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    this.router.navigate(['']);
  }
  
  getUsers(perPage: number = 10, page: number = 1): Observable<any> {
    const token= this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}?per_page=${perPage}&page=${page}`, { headers: headers });
  }
  getUser(id: string): Observable<any>{
    if(id == ''){
     throw Error('errore id vuoto')
    } else {
    const token= this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers: headers });
  }
  }
  addUser(user: any): Observable<any> {
    const token= this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    console.log(user);
    return this.http.post(this.apiUrl, user, { headers: headers });
  }
  deleteUser(userId: number): Observable<any> {
    const token= this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: headers });
  }
  addComment(postId: number, comment: { name: string; email: string; body: string }): Observable<any> {
    const token= this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const endpoint = `${this.apiUrl1}/posts/${postId}/comments`;
    return this.http.post(endpoint, comment, { headers });
  }
}