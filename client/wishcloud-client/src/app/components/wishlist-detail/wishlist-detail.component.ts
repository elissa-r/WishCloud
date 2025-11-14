import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { Wishlist } from '../../models/wishlist.model';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.component.html',
  styleUrls: ['./wishlist-detail.component.css']
})
export class WishlistDetailComponent implements OnInit {
  wishlist?: Wishlist;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.fetchWishlist(id);
    } else {
      this.errorMessage = 'No wishlist id provided in the URL.';
    }
  }

  fetchWishlist(id: string): void {
    this.loading = true;
    this.wishlistService.getWishlistById(id).subscribe({
      next: (data) => {
        this.wishlist = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load wishlist.';
        this.loading = false;
      }
    });
  }
}

