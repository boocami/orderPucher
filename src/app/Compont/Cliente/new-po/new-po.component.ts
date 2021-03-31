import { Component, OnInit, ViewChild } from '@angular/core';
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


const ELEMENT_DATA: any[] = [];


@Component({
  selector: 'app-new-po',
  templateUrl: './new-po.component.html',
  styleUrls: ['./new-po.component.css']
})
export class NewPOComponent implements OnInit {

  myControl = new FormControl();
  options: string[]= [];
  ProductosI: Productos[]=[];
  nombrep: string
  filteredOptions: Observable<string[]>;
  precio: number;
  emailUSer: string;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private Productos: ProductosService, private OrdenesCompraService: OrdenesCompraService, private toastr: ToastrService ) { }

  DetalleOrdenCompra : DetalleOrdenCompra [] = [];
  OrdenCompra : OrdenCompra [] = [];
  valorConIva: number = 0;
  valorSinIva:number = 0;
  get producto() { return this.ordenCompraForm.get('producto') };
  get cantidad() { return this.ordenCompraForm.get('cantidad') };
  get precioP() { return this.ordenCompraForm.get('precio')};

  public ordenCompraForm = new FormGroup({
    producto: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    precio : new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    
 
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.llenarSelect();
    this.myControl.valueChanges
    .pipe(
    debounceTime(200),
    ).subscribe(val =>{
      this.ProductosI.forEach(element => {
        if(element.nombre == val){  
          this.precio = element.precio;
          this.nombrep = element.nombre;
        }
      });
    }); 
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  llenarSelect(){ 
    
    this.Productos.getProductos().then((querySnapshot) => { 
       querySnapshot.forEach((doc) => {
         var nombreP = doc.data().nombre;
         var idP = doc.data().idp;
         var precio = doc.data().precio;
        this.options.push(nombreP);
        this.ProductosI.push({
          idp: idP,
          nombre: nombreP,
          precio: precio
        })
       })
    })
  }

  insertTablaTemporal(){ 
    this.DetalleOrdenCompra.push({
      nombreP : this.nombrep,
      cantidad: parseInt(this.ordenCompraForm.value.cantidad),
      precioProducto: this.precio * parseInt(this.ordenCompraForm.value.cantidad)
    })
    this.calcularValorSinIva();
    this.calcularValorConInva();
    this.limpiarFormulario();
  }
  onSave(){
    this.calcularValorSinIva();
   this.emailUSer = String(localStorage.getItem('email'));
    this.OrdenCompra.push({
      totalConIva: this.calcularValorConInva(),
      totalSinIva: this.calcularValorSinIva(),
      usuario: this.emailUSer
    });
    if(this.OrdenesCompraService.addOrdeCompra(this.DetalleOrdenCompra, this.OrdenCompra) == true){
      this.showSuccess();
      this.DetalleOrdenCompra = [];
      this.OrdenCompra = [];
      this.valorSinIva = 0;
      this.valorConIva = 0;
    }
  }
  calcularValorSinIva(){ 
    this.valorSinIva = 0;
    this.DetalleOrdenCompra.forEach(element => {
        console.log(element.precioProducto * element.cantidad),
        this.valorSinIva += element.precioProducto * element.cantidad
    });
    return this.valorSinIva;
  }

  calcularValorConInva(){ 
    this.valorConIva = 0;
    var valorSinIva = this.calcularValorSinIva();
    this.valorConIva = (valorSinIva * 19)/100;
    return this.valorConIva; 
  }

  limpiarFormulario(){ 
    this.ordenCompraForm.reset();
  }

  showSuccess() {
    this.toastr.success('Exito!', 'Se ha guardado con exito');
  }
}
