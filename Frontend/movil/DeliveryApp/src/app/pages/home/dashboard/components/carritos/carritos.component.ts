import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CarritoService } from 'src/app/shared/http/gestion-negocio/carrito.service';
import { RealizarPedidoComponent } from '../realizar-pedido-modal/realizar-pedido.component';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
  ]
})
export class CarritosComponent  implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);
  carritos: any[] = [];
  respuesta: any;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.obtenerCarritos();
  }

  obtenerCarritos() {
    this.carritoService.getCarritosOfUsuario(this.usuarioId).subscribe(
      (response: any) => {
        this.carritos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de carritos:', error);
      }
    );
  }

  eliminarCarrito(carritoId: number){

    this.carritoService.deleteCarrito(carritoId).subscribe(
      (response: any) => {
        this.respuesta = response;
        this.obtenerCarritos();
      },
      (error) => {
        console.error('Error al eliminar el carrito', error)
      }
    );
  }

  editarCarrito(carritoId: number){

    this.carritoService.deleteCarrito(carritoId).subscribe(
      (response: any) => {
        this.respuesta = response;
        this.obtenerCarritos();
      },
      (error) => {
        console.error('Error al eliminar el carrito', error)
      }
    );
  }

  hacerPedido(negocioId: number, carritoId: number, total: any, nombreNegocio: string){
    
    this.openPedidoModal(negocioId, carritoId, total, nombreNegocio);
  }

  async openPedidoModal(negocioId: number, carritoId: number, total: any, nombreNegocio: string){
    const modal = await this.modalCtrl.create({
      component: RealizarPedidoComponent,
      componentProps:{
        usuarioId: this.usuarioId,
        negocioId: negocioId,
        totalCarrito: total,
        carritoId: carritoId,
        nombreNegocio: nombreNegocio
      }
    });
    console.error(carritoId);

    return await modal.present();
  }


}
