import { TestBed } from '@angular/core/testing';
import { WishlistproxyService } from './wishlistproxy.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WishlistproxyService', () => {
  let service: WishlistproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]     
    });

    service = TestBed.inject(WishlistproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
