import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { Observable, BehaviorSubject } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyD3661DPM0WZyzIsr2mqNMTcB2TUgMeO_M",
  authDomain: "wishcloud-bf5fe.firebaseapp.com",
  projectId: "wishcloud-bf5fe",
  storageBucket: "wishcloud-bf5fe.appspot.com",
  messagingSenderId: "499215872773",
  appId: "1:499215872773:web:5a1e77580be9edef817d6c",
  measurementId: "G-YXWE7LJJ0C"
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private userSub = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    onAuthStateChanged(this.auth, user => {
      this.userSub.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  currentUser(): any {
    return this.auth.currentUser;
  }

  userChanges(): Observable<any> {
    return this.userSub.asObservable();
  }
}
