import { Injectable } from '@angular/core';
import {User} from '../Interface/user';
import {DetalleOrdenCompra} from '../Interface/detalle-orden-compra';
import {OrdenCompra} from '../Interface/orden-compra';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class OrdenesCompraService {

  constructor(  
    private firebaseService: FirebaseService,
    public afs: AngularFirestore,) { 
  }

  addOrdeCompra(dett, orden){
    const detalle: DetalleOrdenCompra [] =  [];
    var fechaI = new Date();
    dett.forEach(element=>{
      detalle.push({
        cantidad:element.cantidad,
        nombreP: element.nombreP,
        precioProducto:element.precioProducto,
      })
    })
    var codigoOrdent = this.generarCodigo()+Math.floor((Math.random()* (100 - 1) + 1));
    this.afs.collection("ordenCompra").doc(codigoOrdent).set({
      usuario: orden[0].usuario,
      totalSinIva: orden[0].totalSinIva,
      totalConIva: orden[0].totalConIva,
      fechaIngreso: fechaI, 
      idO: codigoOrdent
      
    })
    detalle.forEach(element=>{
      var codigodetalle = this.generarCodigo()+Math.floor((Math.random()* (100 - 1) + 1));
        this.afs.collection("DetalleOrdenCompra").doc(codigodetalle).set({
          cantidad:element.cantidad,
          nombreP: element.nombreP,
          precioProducto:element.precioProducto,
          idO: codigoOrdent
        })
    })
    return true;
  }

  generarCodigo(){ 
    var str = '';
    var ref = 'abcdefghijklmnñopqrstuvwxyz';
    for (var i=0; i<4; i++)
    {
      str += ref.charAt(Math.floor(Math.random()*ref.length));
    }
    return str;
  }

  async getAllOrden(){
    let docOrden = this.afs.firestore.collection(`ordenCompra`).get();
    return docOrden; 
  }
  
  async getAllDetalle(){ 
    let docDetalle = this.afs.firestore.collection(`DetalleOrdenCompra`).get();
    return docDetalle; 
  }
}

