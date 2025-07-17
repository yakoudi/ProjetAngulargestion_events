import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-reponse-demande',
  imports: [FormsModule],
  templateUrl: './reponse-demande.component.html',
  styleUrl: './reponse-demande.component.scss'
})
export class ReponseDemandeComponent implements OnInit {
  demandes: any[] = [];
  commentaireRejet: string = '';
  selectedId: number | null = null;
  message: string = '';

  constructor(private evenementService: EvenementService) {}

  ngOnInit(): void {
    this.chargerDemandes();
  }

  chargerDemandes(): void {
    this.evenementService.getDemandesEnAttente().subscribe({
      next: data => this.demandes = data,
      error: err => console.error(err)
    });
  }

  valider(id: number): void {
    this.evenementService.validerDemande(id).subscribe({
      next: () => {
        this.message = '✅ Demande validée';
        this.chargerDemandes();
      },
      error: err => console.error(err)
    });
  }

  rejeter(): void {
    if (this.selectedId && this.commentaireRejet.trim() !== '') {
      this.evenementService.rejeterDemande(this.selectedId, this.commentaireRejet).subscribe({
        next: () => {
          this.message = '❌ Demande rejetée avec commentaire';
          this.commentaireRejet = '';
          this.selectedId = null;
          this.chargerDemandes();
        },
        error: err => console.error(err)
      });
    }
  }

  ouvrirRejet(id: number): void {
    this.selectedId = id;
    this.commentaireRejet = '';
  }

  annulerRejet(): void {
    this.selectedId = null;
    this.commentaireRejet = '';
  }
}
