import { TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

// TODO: change this to your real auth service name & path
import { AuthService } from '../auth.service';

describe('WelcomeComponent', () => {
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn().mockReturnValue(of({ token: 'fake-token' })),     // adjust as needed
      register: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [
        WelcomeComponent,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ]
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

    component.switchToLogin(fakeEvent);

    expect(component.isRegisterMode).toBe(false);
  });

  // Angular unit test a component #2 login submit calls service
  it('onLoginSubmit should call authService.login with email and password', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    component.loginEmail = 'test@example.com';
    component.loginPassword = 'password123';

    const preventDefault = jest.fn();
    const fakeEvent = { preventDefault } as any as Event;

    component.onLoginSubmit(fakeEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(authServiceMock.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });

  // handling of errorMessage
  it('onLoginSubmit should set errorMessage on login error', () => {
    authServiceMock.login.mockReturnValueOnce(
      throwError(() => new Error('Invalid credentials'))
    );

    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    component.loginEmail = 'fail@example.com';
    component.loginPassword = 'bad';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    component.onLoginSubmit(fakeEvent);

    expect(component.errorMessage).toBeTruthy();
  });
});
