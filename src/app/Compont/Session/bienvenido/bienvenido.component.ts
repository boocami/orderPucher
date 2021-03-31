import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interface/user';
import {FirebaseService} from '../../../Services/firebase.service';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {
  isAdmin: any;

  constructor(private firebaseService: FirebaseService, private router: Router) { }
  
  user: User = {
    uid: '',
    displayName: '',
    email: '',
    roles: {}
  };

  mensaje: string;

  url: string;

  public uid: string = 'null';

  ngOnInit(): void {
    this.firebaseService.isAuth().subscribe(user => {
      if (user) {
        this.user.email = user.email;
        this.uid = user.uid;
        this.firebaseService.isUserAdmin(this.uid).subscribe(userRole => {
          this.isAdmin = userRole['userRegister'].roles.admin;
          console.log(this.isAdmin);
          this.user.displayName = userRole['userRegister'].displayName;
          console.log(userRole['userRegister']);
          this.mensaje = 'Bienvenido: ' +  this.user.email;
          if(this.isAdmin === true){
            console.log("ADMIN");
            this.url = '/adminHome';
          }else if(this.isAdmin === false){
            console.log("USER")
            this.url = '/home';
          }
        }) 
      }
    })
  }

}
