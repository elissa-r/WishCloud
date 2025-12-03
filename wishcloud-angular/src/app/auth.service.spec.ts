import { AuthService } from './auth.service';

// Mocks for Firebase SDK
const initializeAppMock = jest.fn().mockReturnValue({ app: 'fake-app' });
const fakeAuthInstance = { currentUser: { uid: 'user123' } };
const getAuthMock = jest.fn().mockReturnValue(fakeAuthInstance);
const signInWithEmailAndPasswordMock = jest.fn();
const createUserWithEmailAndPasswordMock = jest.fn();

jest.mock('firebase/app', () => ({
  initializeApp: (...args: any[]) => initializeAppMock(...args),
}));

jest.mock('firebase/auth', () => ({
  getAuth: (...args: any[]) => getAuthMock(...args),
  signInWithEmailAndPassword: (...args: any[]) =>
    signInWithEmailAndPasswordMock(...args),
  createUserWithEmailAndPassword: (...args: any[]) =>
    createUserWithEmailAndPasswordMock(...args),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    // Reset mocks before each test
    initializeAppMock.mockClear();
    getAuthMock.mockClear();
    signInWithEmailAndPasswordMock.mockClear();
    createUserWithEmailAndPasswordMock.mockClear();

    service = new AuthService();
  });

  it('should initialize Firebase app and auth on construction', () => {
    expect(initializeAppMock).toHaveBeenCalledTimes(1);
    expect(getAuthMock).toHaveBeenCalledTimes(1);
  });

  it('login should call signInWithEmailAndPassword with auth, email, and password', async () => {
    signInWithEmailAndPasswordMock.mockResolvedValue({ user: { uid: 'abc' } });

    await service.login('test@example.com', 'password123');

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      fakeAuthInstance,
      'test@example.com',
      'password123'
    );
  });

  it('register should call createUserWithEmailAndPassword with auth, email, and password', async () => {
    createUserWithEmailAndPasswordMock.mockResolvedValue({ user: { uid: 'def' } });

    await service.register('reg@example.com', 'pw');

    expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(
      fakeAuthInstance,
      'reg@example.com',
      'pw'
    );
  });

  it('getCurrentUserId should return uid when currentUser is set', () => {
    const uid = service.getCurrentUserId();
    expect(uid).toBe('user123');
  });

  it('getCurrentUserId should return null when currentUser is null', () => {
    (fakeAuthInstance as any).currentUser = null;

    const uid = service.getCurrentUserId();
    expect(uid).toBeNull();

    // restore
    (fakeAuthInstance as any).currentUser = { uid: 'user123' };
  });
});