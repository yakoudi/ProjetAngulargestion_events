import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-demande',
  imports: [CommonModule
    ,
      MatCardModule,
      MaterialModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,ReactiveFormsModule],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.scss'
})
export class DemandeComponent {

  evenementForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private evenementService: EvenementService) {
    this.evenementForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      lieu: [''],
      degreImportance: [''],
      cout: [0],
      categorieEvenement: ['']
    });
  }

  onSubmit() {
    if (this.evenementForm.invalid) {
      return;
    }

    const formValue = this.evenementForm.value;

    const evenementDto = {
      titre: formValue.titre,
      description: formValue.description,
      dateDebut: new Date(formValue.dateDebut).toISOString(),
      dateFin: new Date(formValue.dateFin).toISOString(),
      lieu: formValue.lieu,
      degreImportance: formValue.degreImportance,
      cout: formValue.cout,
      categorieEvenement: formValue.categorieEvenement
    };

    this.evenementService.demanderEvenement(evenementDto).subscribe({
      next: () => {
        this.successMessage = "✅ La demande d'événement a été envoyée avec succès !";
        this.errorMessage = '';
        this.evenementForm.reset();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'envoi de la demande.';
        this.successMessage = '';
      }
    });
  }

   onCancel(): void {
    this.evenementForm.reset();
  }



  // Tableau des catégories (mêmes valeurs que l'enum Java)
categories = [
  'TEAM_BUILDING',
  'REUNION',
  'CONFERENCE',
  'SEMINAIRE',
  'ATELIER',
  'ANNIVERSAIRE_ENTREPRISE',
  'AUTRE'
];

// Fonction pour afficher un label plus lisible
formatCategorie(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

 
}


