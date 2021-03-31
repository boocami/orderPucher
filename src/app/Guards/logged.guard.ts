import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  private logged: boolean;
  public role: boolean;
  constructor(
    private firebaseS: FirebaseService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.firebaseS.currentUSer().then(resp => {
      if (resp != null) {
        console.log('guard pass!!');
        this.logged = true;        
        this.router.navigate(['/welcome']);
      } else {
        this.logged = false;
        window.alert('Ruta protegida');
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.log('error guard canActivate-->', error);
      this.logged = false;
      window.alert('Ruta protegida');
      return this.logged;
    })
    return this.logged;
  }

}