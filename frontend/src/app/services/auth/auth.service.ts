import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private user = 'user';
  private apiUrl = 'https://localhost:8000/api';

  private _currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  currentUser(): Observable<User | null> {
    //para salvar  pagina e evitar perda de dados ao atualizar
    if (localStorage.getItem(this.user) && !this._currentUser.value) {
      const userData = localStorage.getItem(this.user);
      if (userData) {
        this._currentUser.next(JSON.parse(userData));
      }
    }
    return this._currentUser.asObservable();
  }

   // verificar se usuário está autenticado pelo token no localStorage
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.user);
  }

  logout(): void {
    localStorage.removeItem(this.user);
    this._currentUser.next(null);
    // redirecionar ou outras ações...
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: { 'Content-Type': 'application/ld+json' }
    });
  }

  login(user: any): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/login`, user).pipe(
      tap((data) => {
        // ações pós-cadastro, se necessário
        localStorage.setItem(this.user, JSON.stringify(data));
        this._currentUser.next(data);
      })
    );
  }
}
