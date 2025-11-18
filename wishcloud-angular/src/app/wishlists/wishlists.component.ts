import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishlistproxyService } from '../wishlistproxy.service';

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
    private proxy$: WishlistproxyService
  ) {
    this.proxy$.getListsIndex().subscribe((result: any[]) => {
      this.lists = result;
      console.log('retrieved lists from server:', result);
    });
  }

  // Called when you click a card
  goToList(list: any): void {
    // adjust property name if your backend uses something else (e.g. list._id)
    this.router.navigate(['/list', list.id]);
  }

  // Called when "Save Wishlist" is clicked in the modal
  onCreateWishlist(event: Event): void {
    event.preventDefault();

    const payload = {
      name: this.newListName,
      photoUrl: this.newListPhoto,
      budget: this.newListBudget,
      date: this.newListDate,
    };

    console.log('Create wishlist payload:', payload);

    // TODO: when you’re ready, call a backend method here, e.g.:
    // this.proxy$.createWishlist(payload).subscribe(...)

    // For now, just reset the form:
    this.newListName = '';
    this.newListPhoto = '';
    this.newListBudget = null;
    this.newListDate = '';

    // You can optionally close the modal with JS if you want later.
  }
}
