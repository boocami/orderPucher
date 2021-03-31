import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../Services/firebase.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  public isAdmin: any = null;
  public userUid: string = null;

  constructor( private firebaseService: FirebaseService,) { 
    
  }

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  // getCurrentUser() {
  //   this.firebaseService.isAuth().subscribe(auth => {
  //     if (auth) {
  //       this.userUid = auth.uid;
  //       this.firebaseService.isUserAdmin(this.userUid).subscribe(userRole => {
  //         this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
  //         // this.isAdmin = true;
  //       })
  //     }
  //   })
  // }
}
