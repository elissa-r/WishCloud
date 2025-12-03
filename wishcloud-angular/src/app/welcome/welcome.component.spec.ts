import { TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { AuthService } from '../auth.service';

describe('WelcomeComponent', () => {
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn().mockResolvedValue({ user: { uid: 'user123' } }),
      register: jest.fn().mockResolvedValue({ user: { uid: 'user123' } }),
    };

    await TestBed.configureTestingModule({
      imports: [ WelcomeComponent ],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Angular unit test a component #1 mode switching
  it('switchToRegister and switchToLogin should toggle isRegisterMode', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    // default should be login mode
    expect(component.isRegisterMode).toBe(false);

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;
    component.switchToRegister(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(component.isRegisterMode).toBe(true);
    expect(component.errorMessage).toBe('');

    component.switchToLogin(fakeEvent);

    expect(component.isRegisterMode).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  // Angular unit test a component #2 login submit calls service
  it('onLoginSubmit should call auth.login with email and password', async () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    component.loginEmail = 'test@example.com';
    component.loginPassword = 'password123';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    await component.onLoginSubmit(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(authServiceMock.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });
});
