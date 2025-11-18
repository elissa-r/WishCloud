import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  standalone: true,
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  imports: [CommonModule]
})
export class WishlistPageComponent implements OnInit {
  wishlist: any = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.wishlistService.getWishlistById(id).subscribe({
      next: (w) => {
        this.wishlist = w;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Could not load wishlist';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
