import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishlistproxyService } from '../wishlistproxy.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.css'
})

export class WishlistsComponent {
  // Filled with data from backend
  lists: any[] = [];

  // Default image if a list has no photo
  defaultImage =
    'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800';

  // New wishlist form fields
  newListName = '';
  newListPhoto = '';
  newListBudget: number | null = null;
  newListDate = '';

  constructor(
    private router: Router,
    private proxy$: WishlistproxyService,
    private auth: AuthService
  ) {
    const userID = this.auth.getCurrentUserId();

    if (!userID) {
      console.error('No logged-in user; redirecting to home.');
      this.lists = [];
      this.router.navigate(['/']);  // back to welcome/login
      return;
    }

    this.proxy$.getListsIndex(userID).subscribe({
      next: (result: any[]) => {
        this.lists = result;
        console.log('retrieved lists from server for user', userID, result);
      },
      error: (err) => {
        console.error('Failed to load wishlists for user', userID, err);
        this.lists = [];
      }
    });
  }

  // Called when you click a card
  goToList(list: any) {
    this.router.navigate(['/items', list._id], {
      queryParams: { name: list.name }
    });
  }

  // Called when "Save Wishlist" is clicked in the modal
  onCreateWishlist(event: Event): void {
    event.preventDefault();

    const userID = this.auth.getCurrentUserId();
    if (!userID) {
      console.error('No logged-in user; cannot create wishlist.');
      return;
    }

    const payload = {
      name: this.newListName,
      photoUrl: this.newListPhoto || null,
      budget: this.newListBudget || null,
      date: this.newListDate || null,
      userID: userID
    };

    this.proxy$.createWishlist(payload).subscribe({
      next: (saved) => {
        console.log('Saved wishlist:', saved);

        // Add immediately to the UI so it appears without refresh
        this.lists.push(saved);

        // Reset modal form
        this.newListName = '';
        this.newListPhoto = '';
        this.newListBudget = null;
        this.newListDate = '';
      },
      error: (err) => {
        console.error('Failed to save wishlist:', err);
      }
    });
  }
}
