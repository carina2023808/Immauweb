// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:8000/api'; // URL da sua API Symfony

//   constructor(private http: HttpClient) {}



//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }


//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }


//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/users`);
//   }


//   getUserById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/users/${id}`);
//   }


//   updateUser(id: number, data: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/users/${id}`, data);
//   }


//   deleteUser(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/users/${id}`);
//   }
// }


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api'; // URL da API Symfony

  constructor(private http: HttpClient) {}

  // Buscar todos os usuários
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Buscar um usuário pelo ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  // Atualizar usuário
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }

  // Excluir usuário
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
