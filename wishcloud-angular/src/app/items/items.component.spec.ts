import { TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ItemsComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
