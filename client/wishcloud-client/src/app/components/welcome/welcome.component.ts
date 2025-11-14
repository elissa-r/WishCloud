
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

  constructor(private router: Router) {}

  goToWishlists(): void {
    this.router.navigate(['/wishlists']);
  }
}
