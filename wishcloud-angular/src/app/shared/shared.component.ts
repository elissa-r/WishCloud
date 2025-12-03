import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent {

  wishlistId = '';
  wishlistName = '';
  items: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistproxyService
  ) {}

  ngOnInit() {
    this.wishlistId = this.route.snapshot.paramMap.get('id')!;
    this.wishlistName = this.route.snapshot.queryParamMap.get('name') || '';
    console.log("SHARED PAGE LOADED");
  console.log("wishlistId:", this.wishlistId);
  console.log("wishlistName:", this.wishlistName);
    this.loadItems();
    
  }

  loadItems() {
    this.wishlistService.getItemsForList(this.wishlistId)
      .subscribe(data => {
        this.items = data;
      });
  }
}
