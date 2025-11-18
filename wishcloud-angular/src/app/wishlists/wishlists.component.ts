import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { WishlistproxyService } from '../wishlistproxy.service'; // <-- check path

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.css'
})
export class WishlistsComponent {

  displayedColumns: string[] = ['name', 'description', 'due', 'state', 'owner'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, proxy$: WishlistproxyService) {
    proxy$.getListsIndex().subscribe((result: any[]) => {
      this.dataSource = new MatTableDataSource<any>(result);
      // this.dataSource.sort = this.sort;
      console.log("retrieved data from server.");
    });
  }

  ngOnInit() {}

  clickEvent(): void {
    this.router.navigate(['']);
  }
}