import { AuthService } from '@/auth/services/auth.service';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './admin-dashboard-layout.html',
})
export class AdminDashboardLayout {

  authService = inject(AuthService);

  user = computed(() => this.authService.user());

 }
