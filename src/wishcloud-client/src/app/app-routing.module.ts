import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { WishlistListComponent } from './components/wishlist-list/wishlist-list.component';
import { WishlistDetailComponent } from './components/wishlist-detail/wishlist-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },                // Welcome page
  { path: 'wishlists', component: WishlistListComponent },  // List page
  { path: 'wishlists/:id', component: WishlistDetailComponent }, // Detail page
  { path: '**', redirectTo: '' }                            // Fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
