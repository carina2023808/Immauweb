import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:8000/api';

//  getUserWithProperties(id: number): Observable<any> {
//   return this.http.get<any>(`https://localhost:8000/api/users/${id}`);
// }

  constructor(private http: HttpClient) {}


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserWithProperties(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }


  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/edit`, data);
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}/delete`);
  }
}
