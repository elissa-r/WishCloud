import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  switchToRegister(event: Event): void {
    event.preventDefault();
    this.isRegisterMode = true;
  }

  switchToLogin(event: Event): void {
    event.preventDefault();
    this.isRegisterMode = false;
  }

  onLoginSubmit(event: Event): void {
    event.preventDefault();
    console.log('Login with', this.loginEmail, this.loginPassword);
    // TODO: call Firebase auth here later
  }

  onRegisterSubmit(event: Event): void {
    event.preventDefault();
    console.log('Register with', this.regName, this.regEmail, this.regPassword);
    // TODO: call Firebase auth here later
  }
}
