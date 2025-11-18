import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  wishlists: any[] = [];
  // form model for create
  wishlistName = '';
  wishlistPhoto = '';
  wishlistBudget: number | null = null;
  wishlistDate: string | null = null;

  constructor(
    private wishlistService: WishlistService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser();
    const uid = user?.uid || '';
    this.wishlistService.getWishlistsForUser(uid).subscribe({
      next: lists => this.wishlists = lists,
      error: err => console.error(err)
    });
  }

  async createWishlist() {
    if (!this.wishlistName) return;
    const user = this.auth.currentUser();
    const payload = {
      name: this.wishlistName,
      photo: this.wishlistPhoto || '',
      budget: this.wishlistBudget || 0,
      date: this.wishlistDate || '',
      userId: user?.uid
    };

    try {
      const result: any = await this.wishlistService.createWishlist(payload).toPromise();
      // assume backend returns created id either as { id } or in result.id
      const id = result?.id || result?.name || result?.insertedId || null;
      this.wishlistName = '';
      this.wishlistPhoto = '';
      this.wishlistBudget = null;
      this.wishlistDate = null;

      if (id) {
        // navigate to newly created wishlist page
        this.router.navigate(['/wishlist', id]);
      } else {
        // fallback: reload list
        this.ngOnInit();
      }
    } catch (err) {
      console.error('create error', err);
      alert('Failed to create wishlist');
    }
  }

  logout() {
    this.auth.logout();
  }
}
