import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AjouteruserComponent } from '../ajouteruser/ajouteruser.component';
import { UserService } from 'src/app/services/user.service';
import { ModifieruserComponent } from '../modifieruser/modifieruser.component';
@Component({
  selector: 'app-listeuser',
  imports: [ CommonModule,
        MatCardModule,
        MaterialModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,],
  templateUrl: './listeuser.component.html',
  styleUrl: './listeuser.component.scss'
})
export class ListeuserComponent implements OnInit {
 utilisateurs: any[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

 

  openAjoutDialog(): void {
    const dialogRef = this.dialog.open(AjouteruserComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.loadUtilisateurs();
    });
  }

  supprimerUtilisateur(id: number): void {
    if (confirm('Supprimer cet utilisateur ?')) {
      this.userService.delete(id).subscribe(() => {
        this.loadUtilisateurs();
      });
    }
  }

  loadUtilisateurs(): void {
    this.userService.getAll().subscribe({
      next: data => this.utilisateurs = data,
      error: err => console.error('Erreur chargement utilisateurs', err)
    });
  }

  openUpdateDialog(user: any): void {
    const dialogRef = this.dialog.open(ModifieruserComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadUtilisateurs();
      }
    });
  }
}

