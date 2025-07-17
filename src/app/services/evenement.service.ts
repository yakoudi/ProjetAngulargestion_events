import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private baseUrl = 'http://localhost:8083/api/evenements';

  constructor(private http: HttpClient) {}

  // Génère les headers avec le token JWT
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  // ✅ 1. Demander un événement (SUPERIEUR)
  demanderEvenement(evenement: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/demanderEvenement`, evenement, this.getAuthHeaders());
  }

  // ✅ 2. Voir les événements créés par l'utilisateur connecté
  getMesDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mes-demandes`, this.getAuthHeaders());
  }

  // ✅ 3. Modifier un événement (SUPERIEUR)
  updateEvenement(id: number, evenement: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modifierEvenement/${id}`, evenement, this.getAuthHeaders());
  }

  // ✅ 4. Supprimer un événement (SUPERIEUR)
  deleteEvenement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/supprimerEvenement/${id}`, this.getAuthHeaders());
  }

  // ✅ 5. Voir les demandes en attente (RH)
  getDemandesEnAttente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getDemandesEnAttente`, this.getAuthHeaders());
  }

  // ✅ 6. Valider une demande (RH)
  validerDemande(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/validerDemande`, {}, this.getAuthHeaders());
  }

  // ✅ 7. Rejeter une demande avec commentaire (RH)
  rejeterDemande(id: number, commentaireRh: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/rejeterDemande`, { commentaireRh }, this.getAuthHeaders());
  }

  // ✅ 8. Voir les événements validés (optionnel)
  getEvenementsValides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEvenementsValides`, this.getAuthHeaders());
  }
}
