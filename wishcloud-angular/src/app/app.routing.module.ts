import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { ItemsComponent } from './items/items.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: WishlistsComponent },
  { path: 'list/:id', component: ItemsComponent}
];