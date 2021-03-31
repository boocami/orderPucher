import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {NewPOComponent} from './Compont/Cliente/new-po/new-po.component';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './Compont/Session/login/login.component';
import { AppComponent } from './app.component';
import { PurchaseOrderComponent } from './Compont/Cliente/purchase-order/purchase-order.component';
import { NavComponent } from './Compont/Layout/nav/nav.component';
import { PasswordDirective } from './Directive/password.directive';
import { SpinnerComponent } from './Animation/spinner/spinner.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {MatTabsModule} from '@angular/material/tabs';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './Compont/Session/register/register.component';
import { NotfoundpageComponent } from './Compont/notfoundpage/notfoundpage.component';
import { HomeClienteComponent } from './Compont/Cliente/home-cliente/home-cliente.component';
import { HomeAdminComponent } from './Compont/Administrador/home-admin/home-admin.component';
import { BienvenidoComponent } from './Compont/Session/bienvenido/bienvenido.component';
import { DetailPurchaseComponent } from './Compont/Cliente/detail-purchase/detail-purchase.component';
import {SobreComponent} from './lazy/sobre/sobre.component';
@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrderComponent,
    NavComponent,
    NewPOComponent,
    PasswordDirective,
    SpinnerComponent,
    NotfoundpageComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundpageComponent,
    HomeClienteComponent,
    HomeAdminComponent,
    BienvenidoComponent,
    DetailPurchaseComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    DataTablesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTableModule,
    ToastrModule.forRoot(),
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewPOComponent]
})
export class AppModule { }
