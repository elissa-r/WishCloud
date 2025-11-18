import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }
}
