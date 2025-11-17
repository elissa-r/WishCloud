import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { WishlistproxyService } from '../wishlistproxy.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class WishlistsComponent {

  displayedColumns: string[] = ['name', 'description', 'due', 'state', 'owner'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, proxy$: WishlistproxyService) {
    proxy$.getListsIndex().subscribe( (result: any[]) => 
    {
      this.dataSource = new MatTableDataSource<any>(result);
      //this.dataSource.sort = this.sort;
      console.log("retrieved data from server.");
    });
  }

  ngOnInit() {
  }

  clickEvent(): void {
    this.router.navigate(['']);
  }
}