import { TestBed } from '@angular/core/testing';

import { WishlistproxyService } from './wishlistproxy.service';

describe('WishlistproxyService', () => {
  let service: WishlistproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});