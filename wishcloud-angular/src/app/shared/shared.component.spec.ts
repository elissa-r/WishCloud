import { TestBed } from '@angular/core/testing';
import { SharedComponent } from './shared.component';
import { ActivatedRoute } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { of } from 'rxjs';

describe('SharedComponent', () => {
  let wishlistServiceMock: any;
  
  beforeEach(async () => {
    wishlistServiceMock = {
      // used in ngOnInit → loadItems
      getItemsForList: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [SharedComponent], // standalone component
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) =>
                  key === 'id' ? 'test-id' : null,
              },
              queryParamMap: {
                get: (key: string) =>
                  key === 'name' ? 'Test Wishlist' : null,
              },
            },
          },
        },
        { provide: WishlistproxyService, useValue: wishlistServiceMock },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SharedComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit → loadItems

    expect(component).toBeTruthy();
    // optional, but nice sanity check:
    expect(wishlistServiceMock.getItemsForList).toHaveBeenCalledWith('test-id');
  });
});