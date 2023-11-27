import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/shared/services/http/gestion-negocio/carrito.service';
import { CarritoProductoRequest } from 'src/app/shared/dtos/gestion-carritos/carrito-producto-request';
import { ProductoService } from 'src/app/shared/services/http/gestion-negocio/producto.service';
import {closeCircleOutline, addCircleOutline, removeCircleOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class DetalleProductoComponent  implements OnInit {

  usuarioId: any;
  productoId: any;
  negocioId: any;
  cantidad: number = 1;
  cantidadMin: number = 1;
  cantidadMax: number = 20;
  peticion: CarritoProductoRequest = {cartId: 0, productoId: 0, cantidad: 0};
  producto: any;
  mensaje: any;

  constructor( 
    private modalCtrl: ModalController,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private toastController: ToastController
  ) { addIcons({closeCircleOutline, addCircleOutline, removeCircleOutline})}

    ngOnInit() {
      this.obtenerProducto();
      this.cantidad = 1;
    }

    obtenerProducto() {
      this.productoService.getProductoById(this.productoId).subscribe(
        (resultado) => {
          this.producto = resultado;
        },
        (error) => {
          console.error('Error al obtener el producto', error);
        }
      );
    }
  
    agregarAlCarrito() {
  
      this.peticion.cartId = 0;
      this.peticion.cantidad = this.cantidad;
      this.peticion.productoId = this.productoId;
  
      this.carritoService.agregarProductoAlCarrito(this.usuarioId, this.negocioId, this.peticion).subscribe(
        () => {
          console.log('producto agregado correctamente')
          this.presentToast("Producto agregado al carrito");
        },
        (error) => {
          console.error('Error al agregar el producto al carrito', error);
          this.mensaje = error.error.message;
          this.presentToast(this.mensaje);
        }
      );

      this.close();
    }

    close(){
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }

    incrementarCantidad(){
      if(this.cantidad < this.cantidadMax)
        this.cantidad += 1;
      else
        this.cantidad = this.cantidadMax;
    }

    decrementarCantidad(){
      if(this.cantidad > this.cantidadMin)
        this.cantidad -= 1;
      else
        this.cantidad = this.cantidadMin;
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 1000,
        position: 'bottom',
      });
  
      await toast.present();
    }



}
