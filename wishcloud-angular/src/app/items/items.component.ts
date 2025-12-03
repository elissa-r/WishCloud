import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;


@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ItemsComponent {

  wishlistId = '';
  wishlistName = '';
  items: any[] = [];
  selectedItem: any = null;
  shareUrl: string | null = null;


  newItem: {
    name: string;
    price: number | null;
    photoLink: string;
    itemLink: string;
    description: string;
  } = {
    name: '',
    price: null,
    photoLink: '',
    itemLink: '',
    description: '',
  };

  defaultImage =
    'https://via.placeholder.com/300x200.png?text=No+Image';

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistproxyService
  ) {}
// 
  ngOnInit() {
    this.wishlistId = this.route.snapshot.paramMap.get('id')!;
    console.log("Loaded wishlist ID:", this.wishlistId);
    this.wishlistName = this.route.snapshot.queryParamMap.get('name')!;
    this.loadItems();
  }

  loadItems() {
    this.wishlistService.getItemsForList(this.wishlistId)
      .subscribe(data => {
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
          description: ''
        };

      const modalEl = document.getElementById('addItemModal') as any;
      if (modalEl) {
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';

        // Remove backdrop manually 
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());

        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      }

      });
  }

  openDeleteModal(item: any) {
    this.selectedItem = item;

    const modalEl = document.getElementById('deleteModal');
    new bootstrap.Modal(modalEl!).show();
  }

  deleteItem() {
    this.wishlistService.deleteItem(this.selectedItem._id)
      .subscribe(() => {

        // Remove from UI
        this.items = this.items.filter(i => i._id !== this.selectedItem._id);

        // Close modal
        const modalEl = document.getElementById('deleteModal');
        const modal = bootstrap.Modal.getInstance(modalEl!);
        modal.hide();
      });
  }

  generateShareLink() {
  if (!this.wishlistId) return;

  this.wishlistService.generateShareLink(this.wishlistId).subscribe({
    next: (res) => {
      // Force the frontend port (Angular)
      this.shareUrl = `http://localhost:4200/shared/${this.wishlistId}?name=${this.wishlistName}`;
    },
    error: (err) => {
      console.error('Share link error:', err);
    }
  });
}

  copyShareUrl() {
  if (!this.shareUrl) return;
  
  navigator.clipboard.writeText(this.shareUrl);
  alert('Link copied!');
  }


}
