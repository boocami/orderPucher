import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from '../../../Services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { passwordValidation } from '../../../Directive/password.directive';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/Interface/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Roles } from 'src/app/Interface/roles';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userState: any;

  public animation: boolean = false;

  get email() { return this.RegisterForm.get('email') };
  get pass() { return this.RegisterForm.get('pass') };
  get nombre(){return this.RegisterForm.get('nombre')};

  public RegisterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, passwordValidation()]),
    nombre: new FormControl('', [Validators.required,])
  })

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddUser() {
    console.log('submit -->', this.RegisterForm.value);
    this.firebaseService.registerUser(this.RegisterForm.value.email, this.RegisterForm.value.pass)
      .then((res) => {
        this.firebaseService.isAuth().subscribe(user => {
          if (user) {
            this.SetUserData(user);
          }
        });
      }).catch(err => console.log('err', err.message));
  }

  SetUserData(user) {
    const roles: Roles = {
      subscriber: true,
      editor: true,
      admin: false,
    }
    const userRegister: User = {
      uid: user.uid,
      email: user.email,
      displayName: this.RegisterForm.value.nombre,
      roles: roles,
    }
  // Add a new document with a generated id.
    this.afs.collection("users").doc(user.uid).set({
      userRegister
    })
    .then((docRef) => {
      this.firebaseService.login(this.RegisterForm.value.email, this.RegisterForm.value.pass);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}