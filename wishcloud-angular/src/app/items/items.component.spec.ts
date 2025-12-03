import { TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { WishlistproxyService } from '../wishlistproxy.service';
import { of } from 'rxjs';

describe('ItemsComponent', () => {
  let wishlistServiceMock: any;
  
  beforeEach(async () => {
     wishlistServiceMock = {
      getItemsForList: jest.fn().mockReturnValue(of([
        { _id: '1', name: 'Item 1', price: 10 },
      ])),
      addItemToList: jest.fn().mockReturnValue(of({})),
      deleteItem: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [ ItemsComponent],
      providers: [
        { provide: WishlistproxyService, useValue: wishlistServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              // matches the way your component reads route + query params
              paramMap: convertToParamMap({ id: 'abc123' }),
              queryParamMap: convertToParamMap({ name: 'Birthday List' }),
            },
          },
        },
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Angular unit test a component #1
  it('should load wishlist id, name, and items on init', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;

    // triggers ngOnInit
    fixture.detectChanges();

    expect(component.wishlistId).toBe('abc123');
    expect(component.wishlistName).toBe('Birthday List');
    expect(wishlistServiceMock.getItemsForList).toHaveBeenCalledWith('abc123');
    expect(component.items).toEqual([
      { _id: '1', name: 'Item 1', price: 10 },
    ]);
  });

  // Angular unit test a component #2
  it('addItem should call service and reset newItem', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;

    // Set required state
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
      expect.objectContaining({
        name: 'New item',
        price: 42,
      }),
    );

    // After the mocked add completes, component should reset the form
    expect(component.newItem).toEqual({
      name: '',
      price: null,
      photoLink: '',
      itemLink: '',
      description: '',
    });
  });
});