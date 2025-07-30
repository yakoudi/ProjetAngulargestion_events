import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service'; // adapte le chemin si besoin
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
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

  add(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouter`, user, this.getAuthHeaders());
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/supprimer/${id}`, this.getAuthHeaders());
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/liste`, this.getAuthHeaders());
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modifier/${id}`, user, this.getAuthHeaders());
  }


   getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current`, this.getAuthHeaders());
  }


uploadPhoto(id: number, formData: FormData): Observable<string> {
  return this.http.post(
    `${this.apiUrl}/upload-photo/${id}`,
    formData,
    {
      ...this.getAuthHeaders(),
      responseType: 'text' // 👈 Ici on spécifie bien que la réponse est du texte brut
    } as {
      headers?: HttpHeaders;
      responseType: 'text';
    }
  );
}
getUserPhoto(filename: string): string {
  if (!filename) {
    return 'assets/images/default-avatar.jpg';
  }
  return `http://localhost:8083/api/utilisateurs/photo/${filename}`;
}
}