import { AuthService } from './auth.service';

// Mocks for Firebase SDK
const initializeAppMock = jest.fn().mockReturnValue({ app: 'fake-app' });
const getAuthMock = jest.fn().mockReturnValue({
  currentUser: { uid: 'user123' }, // default “logged in” user
});
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

  it('login should call signInWithEmailAndPassword with auth, email, and password', async () => {
    signInWithEmailAndPasswordMock.mockResolvedValue({ user: { uid: 'abc' } });

    await service.login('test@example.com', 'password123');

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      expect.any(Object), // the auth instance
      'test@example.com',
      'password123'
    );
  });

  it('register should call createUserWithEmailAndPassword with auth, email, and password', async () => {
    createUserWithEmailAndPasswordMock.mockResolvedValue({ user: { uid: 'def' } });

    await service.register('reg@example.com', 'pw');

    expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(
      expect.any(Object),
      'reg@example.com',
      'pw'
    );
  });

  it('getCurrentUserId should return uid when currentUser is set', () => {
    const uid = service.getCurrentUserId();
    expect(uid).toBe('user123');
  });
});