import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  newItem = {
    name: '',
    price: null,
    photoLink: '',
    itemLink: '',
    description: ''
  };

  defaultImage =
    'https://via.placeholder.com/300x200.png?text=No+Image';

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistproxyService
  ) {}

  ngOnInit() {
    this.wishlistId = this.route.snapshot.paramMap.get('id')!;
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

        // close modal automatically
        const modal = document.getElementById('addItemModal');
        if (modal) (modal as any).style.display = 'none';
      });
  }
}
