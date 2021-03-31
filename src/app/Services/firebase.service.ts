import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {User} from '../Interface/user';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  async login(email: string, pass: string) {
    try {
      const respAuth = await this.angularFireAuth.signInWithEmailAndPassword(email, pass);
      console.log('respuesta Auth-->', respAuth);
      localStorage.setItem(
        'email', respAuth.user.email
      )
      return respAuth;
    } catch (error) {
      console.error('error auth -->', error);
      if(error.code == "auth/user-not-found"){
        alert("No hay ningún registro de usuario que corresponda a este identificador. El usuario puede haber sido eliminado.");
        return error;
      }
    }
  }

  async logout() {
    try {
      const logoutResp = await this.angularFireAuth.signOut();
      console.log('logout exitoso');
      localStorage.clear();
      return logoutResp;
    } catch (error) {
      console.error('logout error -->', error);
      return error;
    }
  }

  async registerUser(email: string, pass: string) {
    try {
      const respRegister = await this.angularFireAuth.createUserWithEmailAndPassword(email, pass);
      console.log('resp registerUser -->', respRegister);
      return respRegister.user;
    } catch (error) {
      console.log('error registerUser -->', error);
    }
  }

  

  async currentUSer() {
    try {
      const currentUSerResp = this.angularFireAuth.currentUser;
      return currentUSerResp;
    } catch (error) {
      console.log('error current user -->', error);
    }
  }
  // *------------------------------------------------------------------------------------------*

  logoutUser() {
    return this.angularFireAuth.signOut();
  }

  isAuth() {
    return this.angularFireAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, { merge: true })
  }


  isUserAdmin(userUid) {
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }

}
