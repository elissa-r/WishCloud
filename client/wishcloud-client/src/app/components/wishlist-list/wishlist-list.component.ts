import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Wishlist } from '../../models/wishlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit {
  wishlists: Wishlist[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWishlists();
  }

  loadWishlists(): void {
    this.loading = true;
    this.errorMessage = '';

    // For now: get all wishlists.
    // You could change this to getWishlistsForUser('someUserId') later.
    this.wishlistService.getAllWishlists().subscribe({
      next: (data) => {
        this.wishlists = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load wishlists.';
        this.loading = false;
      }
    });
  }

  viewDetails(wishlist: Wishlist): void {
    this.router.navigate(['/wishlists', wishlist._id]);
  }
}