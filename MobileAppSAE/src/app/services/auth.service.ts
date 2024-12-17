import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject} from 'rxjs';
import { lastValueFrom } from 'rxjs';


import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userState = new BehaviorSubject<boolean>(false);
  user$: Observable<any>;



  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.afAuth.authState;

    this.user$.subscribe(user => {
      this.userState.next(!!user);
    });
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
      
    } catch (error) {
      console.error('Erreur de connexion :', error);
      throw error;
    }
  }

  async updateDisplayName(displayName: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updateProfile({
        displayName: displayName,
      });
    }
  }

  async signUp(email: string, password: string,displayName: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.updateDisplayName(displayName);
      // if (userCredential.user) {
      //   await this.firestore.collection('users').doc(userCredential.user.uid).set({
      //     uid: userCredential.user.uid,
      //     createdAt: new Date(),
      //   });
      // }
      return userCredential;
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Utilisateur déconnecté avec succès.');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      throw error;
    }
  }

  public isConnected(): Promise<boolean> {
    return new Promise(resolve => {
      this.user$.subscribe(user => {
        console.log('Utilisateur connecté :', user);
        resolve(!!user);
      });
    });

  }

  async getUserInfo():Promise<firebase.User | null>{
    const user = await this.afAuth.currentUser;
    return user;
  }

  public isConnectedInstant(): boolean {
    return this.userState.value;
  }

}
