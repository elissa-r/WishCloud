import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.css'
})
export class WishlistsComponent {
  // This will be filled with the data from your backend
  lists: any[] = [];

  constructor(private router: Router, proxy$: WishlistproxyService) {
    proxy$.getListsIndex().subscribe((result: any[]) => {
      this.lists = result;
      console.log('retrieved lists from server:', result);
    });
  }

  // Called when you click a row
  goToList(list: any): void {
    // adjust property name if your backend uses something else (e.g. list._id)
    this.router.navigate(['/list', list.id]);
  }
}
