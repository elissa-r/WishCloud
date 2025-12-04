import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishlistproxyService } from '../wishlistproxy.service';
import { AuthService } from '../auth.service';

declare var bootstrap: any;

interface Wishlist {
  _id?: string;
  name: string;
  description?: string;
  budget?: number | null;
  date?: string | null;
  photoUrl?: string | null;
  photo?: string | null;
}

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.css',
})
export class WishlistsComponent {
  // Filled with data from backend
  lists: Wishlist[] = [];

  // Default image if a list has no photo
  defaultImage =
    'https://t4.ftcdn.net/jpg/06/18/54/93/360_F_618549372_DZRjfLUDNjNPI5XE7hPfGEiEkCWr0bwp.jpg';

  // New wishlist form fields
  newListName = '';
  newListPhoto = '';
  newListBudget: number | null = null;
  newListDate: string | null = '';

  // For delete modal
  selectedWishlist: Wishlist | null = null;

  constructor(
    private router: Router,
    private proxy$: WishlistproxyService,
    private auth: AuthService
  ) {
    const userID = this.auth.getCurrentUserId();

    if (!userID) {
      console.error('No logged-in user; redirecting to home.');
      this.lists = [];
      this.router.navigate(['/']); // back to welcome/login
      return;
    }

    this.proxy$.getListsIndex(userID).subscribe({
      next: (result: Wishlist[]) => {
        this.lists = result;
        console.log('retrieved lists from server for user', userID, result);
      },
      error: (err) => {
        console.error('Failed to load wishlists for user', userID, err);
        this.lists = [];
      },
    });
  }

  // Called when you click a card
  goToList(list: Wishlist) {
    console.log('Loaded wishlist ID:', list._id);

    if (!list._id) return;

    this.router.navigate(['/items', list._id], {
      queryParams: { name: list.name },
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
      userID: userID,
    };

    this.proxy$.createWishlist(payload).subscribe({
      next: (saved: any) => {
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
      },
    });
  }

  // Open delete modal (same style as items)
  openDeleteWishlistModal(list: Wishlist) {
    this.selectedWishlist = list;

    const modalEl = document.getElementById('deleteWishlistModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  // Delete wishlist (similar to deleteItem)
  deleteWishlist() {
    if (!this.selectedWishlist || !this.selectedWishlist._id) return;

    this.proxy$.deleteWishlist(this.selectedWishlist._id).subscribe({
      next: () => {
        // Remove from UI
        this.lists = this.lists.filter(
          (l) => l._id !== this.selectedWishlist!._id
        );

        // Close modal
        const modalEl = document.getElementById('deleteWishlistModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        this.selectedWishlist = null;
      },
      error: (err) => {
        console.error('Failed to delete wishlist:', err);
      },
    });
  }
}
