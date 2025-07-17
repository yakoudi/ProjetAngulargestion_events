import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EvenementService } from 'src/app/services/evenement.service';
import { DialogModifierEvenementComponent } from '../dialog-modifier-evenement/dialog-modifier-evenement.component';
import { DemandeComponent } from '../demande/demande.component';

@Component({
  selector: 'app-demandeevent',
  imports: [  
      CommonModule,
      MatCardModule,
      MaterialModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
     ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    DemandeeventComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule, ],
  templateUrl: './demandeevent.component.html',
  styleUrl: './demandeevent.component.scss'
})




export class DemandeeventComponent  implements OnInit {
  isDialogOpen = false;
  evenementForm!: FormGroup;
  modifierForm!: FormGroup;
  eventSelectionne: any = null;
  evenements: any[] = [];
  currentEventId: number | null = null; // Pour stocker l'ID de l'événement en cours de modification
  dialogRef: any; // Pour stocker la référence du dialog

  constructor(
    private evenementService: EvenementService,
    private fb: FormBuilder,
    public  dialog: MatDialog
    
  ) {}

  ngOnInit(): void {
    this.evenementForm = this.fb.group({
      titre: [''],
      description: [''],
      dateDebut: [''],
      dateFin: [''],
      lieu: [''],
      degreImportance: [''],
      cout: [''],
      categorieEvenement: ['']
    });

    this.loadEvenements();
  }

  envoyerDemande(): void {
    const formValue = this.evenementForm.value;

    const evenement = {
      idEvenement:formValue.idEvenement,
      titre: formValue.titre,
      description: formValue.description,
      dateDebut: new Date(formValue.dateDebut).toISOString(),
      dateFin: new Date(formValue.dateFin).toISOString(),
      lieu: formValue.lieu,
      degreImportance: formValue.degreImportance,
      cout: formValue.cout,
      categorieEvenement: formValue.categorieEvenement
    };

    this.evenementService.demanderEvenement(evenement).subscribe({
      next: (res: any) => {
        console.log('Demande envoyée avec succès', res);
        this.loadEvenements();
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'envoi', err);
      }
    });
  }

  loadEvenements(): void {
  this.evenementService.getMesDemandes().subscribe(data => {
    console.log('Evenements chargés:', data); // <--- LOG important
    
    if (Array.isArray(data)) {
      this.evenements = data;
    } else {
      this.evenements = [];
      console.warn('Données reçues incorrectes:', data);
    }
  }, err => {
    this.evenements = [];
    console.error('Erreur chargement événements', err);
  });
}

  openAjoutDialog(): void {
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(DemandeComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      if (result === true) this.loadEvenements();
    });
  }

  
ouvrirDialogModification(event: any): void {
  console.log('Event reçu pour modification:', event); // 🔍 ici, vérifie si event.id est bien défini

  const dialogRef = this.dialog.open(DialogModifierEvenementComponent, {
    width: '500px',
    data: event  // ✅ PAS { evenement: event }, juste event
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadEvenements();
    }
  });
}

   
}



  
 




