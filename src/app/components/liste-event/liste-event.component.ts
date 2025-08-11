import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EvenementService } from 'src/app/services/evenement.service';
import { CreateEVFinalDialogComponent } from '../create-evfinal-dialog/create-evfinal-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModifEvFinalComponent } from '../dialog-modif-ev-final/dialog-modif-ev-final.component';
import { MatSelectModule } from '@angular/material/select'; // ✅ requis
import { MatOptionModule } from '@angular/material/core';  // ✅ requis
import { MaterialModule } from '../../material.module';    // optionnel si tu centralises
import { EvenementDetailsDialogComponent } from '../evenement-details-dialog/evenement-details-dialog.component';
@Component({
  selector: 'app-liste-event',
  standalone: true,
  imports: [FormsModule, CommonModule,
    MatPaginatorModule, MatIconModule, MatTooltipModule, CreateEVFinalDialogComponent,
    MatSelectModule, MatOptionModule, MaterialModule, DialogModifEvFinalComponent
  ],
  templateUrl: './liste-event.component.html',
  styleUrl: './liste-event.component.scss'
})
export class ListeEventComponent {
  evenements: any[] = [];
  searchText: string = '';
  isDialogOpen = false;

  constructor(
    private evenementService: EvenementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.chargerEvenements();
  }

    getImageUrl(imageName: string): string {
    return `http://localhost:8083/uploads/${imageName}`;
  }


  chargerEvenements(): void {
    console.log('📥 Chargement des événements...');
    this.evenementService.getAllEvenementsFinal().subscribe({
      next: (data: any[]) => {
        this.evenements = data;
        console.log(`✅ ${data.length} événement(s) récupéré(s)`);

        data.forEach((event: any) => {
          console.log(`🟢 ${event.titre} | ${event.lieuEvenement} | ${event.dateEvenement}`);
          if (event.fournisseurs && event.fournisseurs.length > 0) {
            event.fournisseurs.forEach((f: any) => {
              console.log(`   ↪️ Fournisseur: ${f.nom} ${f.prenom} (${f.type})`);
            });
          }
        });
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des événements', err);
        this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 3000 });
      }
    });
  }

  filteredEvenements(): any[] {
    if (!this.searchText) return this.evenements;
    const lowerSearch = this.searchText.toLowerCase();
    return this.evenements.filter(ev =>
      ev.titre?.toLowerCase().includes(lowerSearch) ||
      ev.description?.toLowerCase().includes(lowerSearch)
    );
  }

  openAjoutDialog(): void {
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(CreateEVFinalDialogComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      if (result) {
        this.snackBar.open('Événement créé avec succès !', 'Fermer', { duration: 3000 });
        this.chargerEvenements();
      }
    });
  }



   openModifDialog(evenement: any): void {
  const dialogRef = this.dialog.open(DialogModifEvFinalComponent, {
    width: '900px',
    data: evenement, // on passe les infos de l'événement à modifier
    disableClose: true,
    autoFocus: false
  });


  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Recharger les événements ou notifier de la mise à jour
      console.log('✅ Événement modifié avec succès.');
      this.chargerEvenements(); // ou une méthode de refresh
    } else {
      console.log(' Modification annulée.');
    }
  });

}

  openDetailsDialog(event: any) {
  this.dialog.open(EvenementDetailsDialogComponent, {
    width: '600px',
    data: event
  });
}
}