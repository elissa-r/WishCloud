import { TestBed } from '@angular/core/testing';
import { WishlistproxyService } from './wishlistproxy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WishlistproxyService', () => {
  let service: WishlistproxyService;
  let httpMock: HttpTestingController;

  // Must match hostUrl in wishlistproxy.service.ts
  const BASE_URL = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]     
    });

    service = TestBed.inject(WishlistproxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //HTTP unit tests
  it('getListsIndex should issue a GET to /wishlists/user/:userId', () => {
    const userId = 'user123';
    const mockResponse = [
      { _id: 'w1', name: 'List 1' },
      { _id: 'w2', name: 'List 2' },
    ];

    let actual: any[] | undefined;

    service.getListsIndex(userId).subscribe((lists) => {
      actual = lists;
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/wishlists/user/${userId}`
    );
    expect(req.request.method).toBe('GET');

    // Respond with fake data
    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('getItemsForList should issue a GET to /wishlists/:listId/items', () => {
    const listId = 'abc123';
    const mockResponse = [
      { _id: '1', name: 'Item 1' },
      { _id: '2', name: 'Item 2' },
    ];

    let actual: any[] | undefined;

    service.getItemsForList(listId).subscribe((items) => {
      actual = items;
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/wishlists/${listId}/items`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('addItemToList should issue a POST to /wishlists/:listId/items with item body', () => {
    const listId = 'abc123';
    const newItem = { name: 'New Item', price: 99 };
    const mockResponse = { _id: 'newid', ...newItem };

    let actual: any | undefined;

    service.addItemToList(listId, newItem).subscribe((res) => {
      actual = res;
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/wishlists/${listId}/items`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newItem);

    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });

  it('deleteItem should issue a DELETE to /items/:itemId', () => {
    const itemId = 'item123';
    const mockResponse = { success: true };

    let actual: any | undefined;

    service.deleteItem(itemId).subscribe((res) => {
      actual = res;
    });

    const req = httpMock.expectOne(
      `${BASE_URL}/items/${itemId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(mockResponse);

    expect(actual).toEqual(mockResponse);
  });
});
