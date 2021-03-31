import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPOComponent } from '../new-po/new-po.component';
import {OrdenesCompraService} from '../../../Services/ordenes-compra.service'


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  cantidad: number = 0;
  emailUSer = String(localStorage.getItem('email'));
  IdOrden: any = [];
  constructor(public dialog: MatDialog, public ordenCompraService: OrdenesCompraService) { }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      autoWidth: true,
    };
    this.ordenCompraService.getAllOrden().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        if(doc.data().usuario == this.emailUSer){
          this.IdOrden.push({
            id: doc.data().idO
          })
          this.cantidad ++;
        }
      })
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewPOComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

}
