import { TestBed } from '@angular/core/testing';
import { WishlistsComponent } from './wishlists.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
