import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  name: string = '';
  listId: string;
  listItems: any;

  constructor(
    private route: ActivatedRoute,
    private list$: WishlistproxyService,
    private router: Router
  ) {
    this.listId = this.route.snapshot.params['id'];
    this.list$.getItems(this.listId).subscribe((res: any) => {
      this.name = res.name;
      this.listItems = res;
      console.log('retrieved list items:', res);
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/list']);
  }
}
