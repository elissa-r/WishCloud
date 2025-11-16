import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { WishlistproxyService } from '../wishlistproxy.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-items',
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
    this.listId = route.snapshot.params['id'];
    this.list$.getItems(this.listId).subscribe((res: any) => {
      this.name = res.name;
      this.listItems = res;
    });
  }

  ngOnInit():void {}
}