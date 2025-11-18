import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service'; // <-- check path

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  name: string = "";
  listId: string;
  listItems: any;

  constructor(
    private route: ActivatedRoute,
    private list$: WishlistproxyService
  ) { 
    this.listId = this.route.snapshot.params['id'];
    this.list$.getItems(this.listId).subscribe((res: any) => {
      this.name = res.name;
      this.listItems = res;
    });
  }

  ngOnInit():void {}
}