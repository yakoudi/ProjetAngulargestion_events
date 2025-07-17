import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // ⬅️ IMPÉRATIF
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajouteruser',
  standalone: true,
  imports: [
    CommonModule, // ⬅️ OBLIGATOIRE pour *ngIf
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
  ],
  templateUrl: './ajouteruser.component.html',
  styleUrls: ['./ajouteruser.component.scss']
})
export class AjouteruserComponent {
 form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AjouteruserComponent>
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      idparent: [null]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.add(this.form.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Erreur d’ajout', err)
      });
    }
  }
}