import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(firebaseConfig); //initialize firebase 
  private auth = getAuth(this.app); //connects to frontend

  login(email: string, password: string) { //normal login/registration
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // GOOGLE METHOD
  loginWithGoogle() {
    const provider = new GoogleAuthProvider(); //using OAuth provider
    return signInWithPopup(this.auth, provider);
  }

  getCurrentUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }
}
