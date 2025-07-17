import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dashboard-rh',
  imports: [CommonModule,
          MatCardModule,
          MaterialModule,
          MatIconModule,
          MatMenuModule,
          MatButtonModule,
          RouterOutlet,
          RouterLink,RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-rh.component.html',
  styleUrl: './dashboard-rh.component.scss'
})
export class DashboardRHComponent {

    toggleProfileMenu = false;

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
