import { TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { of } from 'rxjs';

describe('ItemsComponent', () => {
  let wishlistServiceMock: any;
  
  beforeEach(async () => {

    //fake version of backend using jest
     wishlistServiceMock = {
      getItemsForList: jest.fn().mockReturnValue(of([{ _id: '1', name: 'Item 1', price: 10 }])),
      addItemToList: jest.fn().mockReturnValue(of({})),
      deleteItem: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [ ItemsComponent ],
      providers: [
        { provide: WishlistproxyService, useValue: wishlistServiceMock },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'abc123' }),
              queryParamMap: convertToParamMap({ name: 'Birthday List' }),
            },
          },
        },
      ],
    }).compileComponents();
  });

  //component creates without errors
  it('should create', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //on initialization, reads withlistID and name from route, and loads items
  it('should load wishlist id, name, and items on init', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.wishlistId).toBe('abc123');
    expect(component.wishlistName).toBe('Birthday List');
    expect(wishlistServiceMock.getItemsForList).toHaveBeenCalledWith('abc123');
    expect(component.items).toEqual([{ _id: '1', name: 'Item 1', price: 10 }]);
  });

  //service gets called with the right data when adding an item
  it('should call the service when adding an item', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;

    component.wishlistId = 'abc123';
    component.newItem = {
      name: 'New item',
      price: 42,
      photoLink: 'http://photo',
      itemLink: 'http://item',
      description: 'desc',
    };

    const preventDefault = jest.fn();
    const fakeEvent = { preventDefault } as any as Event;

    component.addItem(fakeEvent);

    expect(preventDefault).toHaveBeenCalled();

    expect(wishlistServiceMock.addItemToList).toHaveBeenCalledWith(
      'abc123',
      expect.objectContaining({ name: 'New item', price: 42 }),
    );
  });

  //form resets after item added successfully
  it('should reset newItem after a successful add', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;

    component.wishlistId = 'abc123';
    component.newItem = {
      name: 'New item',
      price: 42,
      photoLink: 'http://photo',
      itemLink: 'http://item',
      description: 'desc',
    };

    const preventDefault = jest.fn();
    const fakeEvent = { preventDefault } as any as Event;

    component.addItem(fakeEvent);

    expect(component.newItem).toEqual({
      name: '',
      price: null,
      photoLink: '',
      itemLink: '',
      description: '',
    });
  });

  //service gets called with the correct item ID when deleting an item
  it('should call the service when deleting an item', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;

    component.selectedItem = { _id: '1', name: 'Test Item', price: 10 };

    component.deleteItem();

    expect(wishlistServiceMock.deleteItem).toHaveBeenCalledWith('1');
  });
});