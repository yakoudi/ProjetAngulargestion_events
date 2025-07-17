import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
 
@Component({
  selector: 'app-dashbord-superieur-heararchique',
  imports: [CommonModule,
          MatCardModule,
          MaterialModule,
          MatIconModule,
          MatMenuModule,
          MatButtonModule,
          RouterOutlet,
          RouterLink,RouterModule
       ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashbord-superieur-heararchique.component.html',
  styleUrl: './dashbord-superieur-heararchique.component.scss'
})
export class DashbordSuperieurHeararchiqueComponent {
     toggleProfileMenu = false;
 
   constructor(private router: Router ,private dialog: MatDialog) {}
 
   logout() {
     localStorage.removeItem('token');
     this.router.navigate(['/login']);
   }
     ouvrirModifierProfil() {
     const dialogRef = this.dialog.open(ModifierProfilComponent, {
       width: '500px',
       data: {
         nom: 'Dupont',
         prenom: 'Jean',
         email: 'jean.dupont@example.com'
       }
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log('Données enregistrées :', result);
         // Appelle le service de modification ici si besoin
       }
     });
   }

}
