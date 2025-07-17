import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service'; // adapte le chemin si besoin
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8083/api/utilisateurs';

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  // Ajouter utilisateur
  add(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouter`, user, this.getAuthHeaders());
  }


  // Supprimer utilisateur
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/supprimer/${id}`, this.getAuthHeaders());
  }

  // Modifier utilisateur

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/liste`, this.getAuthHeaders());
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modifier/${id}`, user, this.getAuthHeaders());
  }

}
