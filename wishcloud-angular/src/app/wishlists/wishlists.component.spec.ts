import { TestBed } from '@angular/core/testing';
import { WishlistsComponent } from './wishlists.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

// TODO: adjust to actual service import
import { WishlistproxyService } from '../wishlistproxy.service';

describe('WishlistsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistsComponent, HttpClientTestingModule]  // standalone FIX
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WishlistsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
