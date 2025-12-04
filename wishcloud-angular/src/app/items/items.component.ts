import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

declare var bootstrap: any;

interface WishlistItem {
  name: string;
  price?: number | null;
  photoLink?: string;
  itemLink?: string;
  description?: string;
  _id?: string; // backend id (optional so tests don't break)
}

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ItemsComponent implements OnInit {
  wishlistId = '';
  wishlistName = '';
  items: WishlistItem[] = [];
  selectedItem: WishlistItem | null = null;
  shareUrl: string | null = null;

  // Default image for items
  defaultImage =
    'https://as1.ftcdn.net/v2/jpg/05/39/70/08/1000_F_539700819_2Tid4o6Im5pQNgEQy8KwxLBzME2Ykdwq.jpg';

  newItem: WishlistItem = {
    name: '',
    price: null,
    photoLink: '',
    itemLink: '',
    description: '',
  };
  component: { _id: string; name: string; price: number; } | undefined;

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistproxyService,
    private location: Location
  ) {}

  ngOnInit() {
    this.wishlistId = this.route.snapshot.paramMap.get('id')!;
    console.log('Loaded wishlist ID:', this.wishlistId);
    this.wishlistName = this.route.snapshot.queryParamMap.get('name') || '';
    this.loadItems();
  }

  loadItems() {
    this.wishlistService.getItemsForList(this.wishlistId).subscribe((data) => {
      this.items = data;
    });
  }

  addItem(event: Event) {
    event.preventDefault();

    this.wishlistService
      .addItemToList(this.wishlistId, this.newItem)
      .subscribe(() => {
        this.loadItems();

        // reset form
        this.newItem = {
          name: '',
          price: null,
          photoLink: '',
          itemLink: '',
          description: '',
        };

        const modalEl = document.getElementById('addItemModal') as HTMLElement | null;
        if (modalEl) {
          modalEl.classList.remove('show');
          modalEl.style.display = 'none';

          // Remove backdrop manually
          const backdrops = document.querySelectorAll('.modal-backdrop');
          backdrops.forEach((b) => b.remove());

          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
        }
      });
  }

  openDeleteModal(item: WishlistItem) {
    this.selectedItem = item;

    const modalEl = document.getElementById('deleteModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  deleteItem() {
    if (!this.selectedItem || !this.selectedItem._id) {
      return;
    }

    this.wishlistService.deleteItem(this.selectedItem._id).subscribe(() => {
      // Remove from UI
      this.items = this.items.filter((i) => i._id !== this.selectedItem!._id);

      // Close modal
      const modalEl = document.getElementById('deleteModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
          modal.hide();
        }
      }

      this.selectedItem = null;
    });
  }

  generateShareLink() {
    if (!this.wishlistId) return;

    this.wishlistService.generateShareLink(this.wishlistId).subscribe({
      next: () => {
        // Use your live Azure URL here
        this.shareUrl = `https://wishcloud.azurewebsites.net/shared/${this.wishlistId}?name=${encodeURIComponent(
          this.wishlistName
        )}`;
      },
      error: (err) => {
        console.error('Share link error:', err);
      },
    });
  }

  copyShareUrl() {
    if (!this.shareUrl) return;

    navigator.clipboard.writeText(this.shareUrl);
    alert('Link copied!');
  }

  goBack() {
    this.location.back();
  }
}
