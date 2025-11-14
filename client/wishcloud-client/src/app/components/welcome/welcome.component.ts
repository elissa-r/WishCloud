import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  title = 'WishCloud';
  subtitle = 'Keep track of your wishlists in one place';
  demoUserId = 'demo-user-1'; // you can change this later

  constructor(private router: Router) {}

  goToWishlists(): void {
    // Simple flow: just go to /wishlists
    this.router.navigate(['/wishlists']);
    // If you want user-specific lists later, you can do:
    // this.router.navigate(['/wishlists'], { queryParams: { userId: this.demoUserId }});
  }
}