// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PropertyService {

//   constructor(private http: HttpClient) {}

//   updateProperty(id: number, formData: FormData): Observable<any> {
//     return this.http.post(`https://localhost:8000/api/properties/property/${id}/update`, formData);
//   }

//   deleteProperty(id: number): Observable<any> {
//     return this.http.delete(`https://localhost:8000/api/properties/property/${id}/delete`);
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'https://localhost:8000/api/properties';

  constructor(private http: HttpClient) {}

  // Atualizar uma propriedade existente
  updateProperty(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/update`, formData);
  }

  // Excluir uma propriedade
  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
