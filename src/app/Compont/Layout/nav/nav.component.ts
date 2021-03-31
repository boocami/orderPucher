import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Interface/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public logout: any;
  public roleAdmin: Boolean;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  user: User = {
    uid: '',
    displayName: '',
    email: '',
    roles: {}
  };

  public uid: string = 'null';
  isAdmin: any;


  ngOnInit(): void {
    this.firebaseService.isAuth().subscribe(user => {
      if (user) {
        this.user.email = user.email;
        this.uid = user.uid;
        this.firebaseService.isUserAdmin(this.uid).subscribe(userRole => {

          if(this.isAdmin === true){
            this.isAdmin = true;
          }else if(this.isAdmin === false){
            this.isAdmin = false;
          }
        }) 
      }
    })
  }
  toLogout($event) {
    this.firebaseService.logout().then(resp => {
      console.log('logout exitoso -->', resp);
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log('error logout -->', error)
    })
  }
}
