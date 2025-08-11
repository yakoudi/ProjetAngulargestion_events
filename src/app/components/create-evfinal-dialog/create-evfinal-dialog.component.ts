
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EvenementService } from 'src/app/services/evenement.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service'; // service pour récupérer utilisateurs
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../../material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-create-evfinal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  templateUrl: './create-evfinal-dialog.component.html',
  styleUrls: ['./create-evfinal-dialog.component.scss'],
})
export class CreateEVFinalDialogComponent implements OnInit {
   evenementForm!: FormGroup;
  imageEvenementFile?: File;
  fileNames: string[] = [];
  fileUrls: string[] = [];
  utilisateurs: any[];

  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private fb: FormBuilder,
    private evenementService: EvenementService,
    private authService: AuthServiceService,
    private userService: UserService,
    @Optional() private dialogRef: MatDialogRef<CreateEVFinalDialogComponent>
  ) {}

  ngOnInit(): void {
    this.evenementForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      dateEvenement: ['', Validators.required],
      lieuEvenement: [''],
      cout: [0, [Validators.required, Validators.min(0)]],
      participants: this.fb.array([]),
      fournisseurs: this.fb.array([]),
    });

    this.chargerUtilisateurs();
  }

  // Charger tous les utilisateurs depuis le backend
  chargerUtilisateurs(): void {
    this.userService.getAll().subscribe({
      next: data => {
        this.utilisateurs = data;
        console.log('Utilisateurs chargés:', this.utilisateurs);
        // Si tu veux préremplir participants, appelle ici la fonction dédiée, ex:
        // this.preRemplirParticipants(['email1@test.com', 'email2@test.com']);
      },
      error: err => console.error('Erreur lors du chargement des utilisateurs', err)
    });
  }

  // Préremplir les participants par une liste d'emails (ex: récupérés)
  preRemplirParticipants(emails: string[]): void {
    this.participantsArray.clear();
    emails.forEach(email => {
      const user = this.utilisateurs.find(u => u.email === email);
      if (user) {
        this.participantsArray.push(
          this.fb.group({
            email: [user.email, [Validators.required, Validators.email]],
            nom: [user.nom || '']
          })
        );
      } else {
        this.participantsArray.push(
          this.fb.group({
            email: [email, [Validators.required, Validators.email]],
            nom: ['']
          })
        );
      }
    });
  }

  get participantsArray(): FormArray {
    return this.evenementForm.get('participants') as FormArray;
  }

  get fournisseursArray(): FormArray {
    return this.evenementForm.get('fournisseurs') as FormArray;
  }

  addParticipant(): void {
  const participantGroup = this.fb.group({
    idUser: [null, Validators.required],   // sélection via mat-select
    email: [{ value: '', disabled: true }],  // lecture seule
    nom: [{ value: '', disabled: true }],    // lecture seule
  });
  this.participantsArray.push(participantGroup);
}

onParticipantSelected(index: number): void {
  const participantGroup = this.participantsArray.at(index);
  const idUser = participantGroup.get('idUser')?.value;
  const user = this.utilisateurs.find(u => u.idUser === idUser);
  if (user) {
    participantGroup.patchValue({
      email: user.email,
      nom: user.nom || '',
    });
  } else {
    participantGroup.patchValue({
      email: '',
      nom: '',
    });
  }
}
  removeParticipant(index: number): void {
    this.participantsArray.removeAt(index);
  }

  addFournisseur(): void {
    const fournisseurGroup = this.fb.group({
      nom: [''],
      email: [''],
      numero: [''],
      type: [''],
      document: [null]
    });
    this.fournisseursArray.push(fournisseurGroup);
    this.fileNames.push('');
  }

  removeFournisseur(index: number): void {
    this.fournisseursArray.removeAt(index);
    this.fileNames.splice(index, 1);
    this.fileUrls.splice(index, 1);
  }

  triggerFileInput(index: number): void {
    const fileInput = this.fileInputs.toArray()[index];
    fileInput?.nativeElement.click();
  }

  onFileChange(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.fournisseursArray.at(index).patchValue({ document: file });
      this.fileNames[index] = file.name;
      this.fileUrls[index] = URL.createObjectURL(file);
      console.log(`Fichier sélectionné fournisseur #${index}:`, file.name);
    }
  }

  onImageEvenementSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageEvenementFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.evenementForm.invalid) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const formData = new FormData();

    formData.append('titre', this.evenementForm.get('titre')?.value);
    formData.append('description', this.evenementForm.get('description')?.value || '');
    formData.append('dateEvenement', new Date(this.evenementForm.get('dateEvenement')?.value).toISOString().substring(0, 10));
    formData.append('lieuEvenement', this.evenementForm.get('lieuEvenement')?.value || '');
    formData.append('cout', this.evenementForm.get('cout')?.value.toString());

    if (this.imageEvenementFile) {
      formData.append('imageEvenement', this.imageEvenementFile, this.imageEvenementFile.name);
    }

   // participants: uniquement tableau d'objets {idUser: ...}
  const participants = this.participantsArray.controls.map(ctrl => ({
    idUser: ctrl.get('idUser')?.value
  }));
  formData.append('participants', JSON.stringify(participants)); // Très important: stringify!

    // Fournisseurs without docs
    const fournisseursSansDocs = this.fournisseursArray.controls.map(fg => {
      const f = fg.value;
      return { nom: f.nom, email: f.email, numero: f.numero, type: f.type };
    });
    formData.append('fournisseurs', JSON.stringify(fournisseursSansDocs));

    // Fichiers fournisseurs
    this.fournisseursArray.controls.forEach(fg => {
      const f = fg.value;
      if (f.document instanceof File) {
        formData.append('files', f.document);
      }
    });

    this.evenementService.createEvenementFinal(formData).subscribe({
      next: () => {
        alert('✅ Événement créé avec succès.');
        this.dialogRef?.close(true);
      },
      error: err => alert('Erreur lors de la création : ' + (err.error?.message || 'Inconnue'))
    });
  }

  onCancel(): void {
    this.dialogRef?.close(false);
  }
}
