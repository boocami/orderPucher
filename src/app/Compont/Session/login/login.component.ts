import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../../Services/firebase.service';
import { passwordValidation } from '../../../Directive/password.directive';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public animation: boolean = false;
  isAdmin: boolean;

  get email() { return this.loginForm.get('email') };
  get pass() { return this.loginForm.get('pass') };

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, passwordValidation()])
  })

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.animation = true;
    console.log('submit -->', this.loginForm.value);
    this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.pass).then(resp => {
      console.log('response login -->', resp);
      if(resp.code){
        console.log("Existio un error");
      }else{      
        this.router.navigate(['/welcome']);
      }
    }).catch(error => {
      console.error('error login -->', error);
      this.animation = false;
    })
  }
}

