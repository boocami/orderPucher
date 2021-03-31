import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {ProductosService} from '../../../Services/productos.service';
import {Productos} from '../../../Interface/productos';
import {OrdenCompra} from '../../../Interface/orden-compra';
import {DetalleOrdenCompra} from '../../../Interface/detalle-orden-compra';
import {OrdenesCompraService} from '../../../Services/ordenes-compra.service'
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-detail-purchase',
  templateUrl: './detail-purchase.component.html',
  styleUrls: ['./detail-purchase.component.css']
})
export class DetailPurchaseComponent implements OnInit {
  @Input() childMessage: any;
  constructor(public ordenCompraS: OrdenesCompraService) { }
  emailUSer = String(localStorage.getItem('email'));
  alldetalle: DetalleOrdenCompra [] = [];
  detalle: DetalleOrdenCompra [] = [];
  id: string;
  ngOnInit(): void {
    this.id = this.childMessage
    this.ordenCompraS.getAllDetalle().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
          this.alldetalle.push({
            idO: doc.data().idO,
            precioProducto: doc.data().precioProducto,
            producto: doc.data().producto,
            cantidad: doc.data().cantidad,
            nombreP: doc.data().nombreP,
          });
      })
      console.log(this.alldetalle[1]);
    })
   
  }

}
