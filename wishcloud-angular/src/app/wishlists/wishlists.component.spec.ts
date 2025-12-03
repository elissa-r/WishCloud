import { TestBed } from '@angular/core/testing';
import { WishlistsComponent } from './wishlists.component';
import { of } from 'rxjs';
import { WishlistproxyService } from '../wishlistproxy.service';
import { AuthService } from '../auth.service';

describe('WishlistsComponent', () => {
  let wishlistServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {

    //fake version of backend using jest
    wishlistServiceMock = {
      getListsIndex: jest.fn().mockReturnValue(of([
        { _id: 'w1', name: 'Birthday', photo: 'url1' },
        { _id: 'w2', name: 'Christmas', photo: 'url2' },
      ])),
      createWishlist: jest.fn().mockReturnValue(of({
          _id: 'newId',
          name: 'New List',
          photoUrl: 'photo',
          budget: 100,
          date: '2025-12-25',
          userID: 'userABC',
        })
      )
    };

    //fake auth service
    authServiceMock = {
      getCurrentUserId: jest.fn().mockReturnValue('user123'),
    };

    await TestBed.configureTestingModule({
      imports: [WishlistsComponent],
      providers: [
        { provide: WishlistproxyService, useValue: wishlistServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ]
    }).compileComponents();
  });

  //component creates without errors
  it('should create', () => {
    const fixture = TestBed.createComponent(WishlistsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //loads lists for the current user
  it('should load lists on init for the current user', () => {
    const fixture = TestBed.createComponent(WishlistsComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(wishlistServiceMock.getListsIndex).toHaveBeenCalled();
    expect(wishlistServiceMock.getListsIndex).toHaveBeenCalledWith('user123');
    expect(component.lists.length).toBe(2);
    expect(component.lists[0].name).toBe('Birthday');
  });

  //onCreateWishlist calls service with the new list data
  it('onCreateWishlist should build payload and call createWishlist', () => {
    const fixture = TestBed.createComponent(WishlistsComponent);
    const component = fixture.componentInstance;

    //for this call pretend the user ID is different
    authServiceMock.getCurrentUserId.mockReturnValue('userABC');

    component.newListName = 'New List';
    component.newListPhoto = 'photo';
    component.newListBudget = 100;
    component.newListDate = '2025-12-25';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    component.onCreateWishlist(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();

    expect(wishlistServiceMock.createWishlist).toHaveBeenCalledWith({
      name: 'New List',
      photoUrl: 'photo',
      budget: 100,
      date: '2025-12-25',
      userID: 'userABC',
    });
  });
});
