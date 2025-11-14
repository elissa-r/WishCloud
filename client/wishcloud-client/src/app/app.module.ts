import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { WishlistListComponent } from './components/wishlist-list/wishlist-list.component';
import { WishlistDetailComponent } from './components/wishlist-detail/wishlist-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WishlistListComponent,
    WishlistDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}