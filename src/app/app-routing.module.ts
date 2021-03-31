import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Compont/Session/login/login.component';
import {PurchaseOrderComponent} from './Compont/Cliente/purchase-order/purchase-order.component';
import { LoggedGuard } from './guards/logged.guard';
import {NotfoundpageComponent} from './Compont/notfoundpage/notfoundpage.component';
import { HomeAdminComponent } from './Compont/Administrador/home-admin/home-admin.component';
import { RegisterComponent } from './Compont/Session/register/register.component';
import { BienvenidoComponent } from './Compont/Session/bienvenido/bienvenido.component';
import {LazyRoutingModule} from './lazy/lazy-routing.module';

const routes: Routes = [
  {path: 'welcome', component:BienvenidoComponent, canActivate: [LoggedGuard]},
  {path: 'home', component: PurchaseOrderComponent},
  {path: 'adminHome', component:HomeAdminComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'characters', loadChildren: () => import("./characters/characters.module").then(mod => mod.CharactersModule) },
  { path: '', component: LoginComponent },
  { path: '**', component: NotfoundpageComponent},
  {path: 'Sobre', loadChildren: './lazy/lazy.module#LazyModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
