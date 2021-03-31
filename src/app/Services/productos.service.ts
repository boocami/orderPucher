import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Productos} from '../Interface/productos';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private afs: AngularFirestore
  ) { }

  productos: Productos[] = [];
  producto: Productos;

  async getProductos(){
    let docProductos = this.afs.firestore.collection(`productos`).get();
    return docProductos; 
  }

  //Obtiene un getProducto
  public getProducto(documentId: string) {
    return this.afs.collection('productos').doc(documentId).snapshotChanges();
  }

}
