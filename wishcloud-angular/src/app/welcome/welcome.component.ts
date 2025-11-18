import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  // Controls which form is shown
  isRegisterMode = false;

  // Login form fields
  loginEmail = '';
  loginPassword = '';

  // Register form fields
  regName = '';
  regEmail = '';
  regPassword = '';

  // For displaying Firebase error messages
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  switchToRegister(event: Event): void {
    event.preventDefault();
    this.isRegisterMode = true;
    this.errorMessage = '';
  }

  switchToLogin(event: Event): void {
    event.preventDefault();
    this.isRegisterMode = false;
    this.errorMessage = '';
  }

  async onLoginSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';

    try {
      await this.auth.login(this.loginEmail, this.loginPassword);
      // On success, go to the dashboard
      this.router.navigate(['/list']);
    } catch (err: any) {
      console.error(err);
      this.errorMessage = err?.message || 'Login failed';
    }
  }

  async onRegisterSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';

    try {
      await this.auth.register(this.regEmail, this.regPassword);
      // (You could also store 'regName' in Firestore here later)
      this.router.navigate(['/list']);
    } catch (err: any) {
      console.error(err);
      this.errorMessage = err?.message || 'Registration failed';
    }
  }
}
