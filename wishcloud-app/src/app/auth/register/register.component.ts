import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async submit(e: Event) {
    e.preventDefault();
    try {
      await this.auth.register(this.email, this.password);
      // optional: set displayName via Firebase user updateProfile
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      alert(err?.message || 'Registration failed');
    }
  }
}
