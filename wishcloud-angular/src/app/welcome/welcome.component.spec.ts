import { TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { AuthService } from '../auth.service';

describe('WelcomeComponent', () => {
  let authServiceMock: any;

  beforeEach(async () => {

    //fake auth service
    authServiceMock = {
      login: jest.fn().mockResolvedValue({ user: { uid: 'user123' } }),
      register: jest.fn().mockResolvedValue({ user: { uid: 'user123' } }),
    };

    await TestBed.configureTestingModule({
      imports: [ WelcomeComponent ],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();
  });

  //component creates without errors
  it('should create', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  //switchToRegister turns on register mode and clears errors
  it('switchToRegister and switchToLogin should toggle isRegisterMode', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    //default should be login mode, with an error
    expect(component.isRegisterMode).toBe(false);
    component.errorMessage = 'Some error';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    component.switchToRegister(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(component.isRegisterMode).toBe(true);
    expect(component.errorMessage).toBe('');
  });

  //switchToRegister turns off register mode and clears errors
   it('switchToLogin should disable register mode and clear errorMessage', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    //start in register mode, with an error
    component.isRegisterMode = true;
    component.errorMessage = 'Some error';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    component.switchToLogin(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(component.isRegisterMode).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  //onLoginSubmit called auth.login with email and password
  it('onLoginSubmit should call auth.login with email and password', async () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    component.loginEmail = 'test@example.com';
    component.loginPassword = 'password123';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    await component.onLoginSubmit(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  //onRegisterSubmit calls auth.register (uses the register mock)
  it('onRegisterSubmit should call auth.register', async () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const component = fixture.componentInstance;

    component.regEmail = 'newuser@example.com';
    component.regPassword = 'newpassword';

    const fakeEvent = { preventDefault: jest.fn() } as any as Event;

    await component.onRegisterSubmit(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(authServiceMock.register).toHaveBeenCalledWith('newuser@example.com', 'newpassword');
  });
});
