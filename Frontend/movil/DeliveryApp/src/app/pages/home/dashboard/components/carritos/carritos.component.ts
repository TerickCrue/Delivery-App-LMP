import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { CarritoService } from 'src/app/shared/services/http/gestion-negocio/carrito.service';
import { RealizarPedidoComponent } from '../realizar-pedido-modal/realizar-pedido.component';
import {trash, cart} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
    RouterLink,
    
  ]
})
export class CarritosComponent  implements OnInit {

  usuarioId: number; //= parseInt(localStorage.getItem('userId') || '', 10);
  carritos: any[] = [];
  respuesta: any;
  loaded: boolean = false;
  noCarts: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private modalCtrl: ModalController,
    private storageService: StorageService,

  ) { addIcons({trash, cart}) }

  ngOnInit() {
    this.obtenerUserId();
    // setTimeout(() => {
    //   this.obtenerCarritos();
    // }, 1000);
    
    this.obtenerCarritos();
  }

  ionViewWillEnter(){
    this.obtenerUserId();
    this.obtenerCarritos();
  }

  obtenerCarritos() {
    this.carritoService.getCarritosOfUsuario(this.usuarioId).subscribe(
      (response: any) => {
        this.carritos = response;
        this.loaded = true;
        this.noCarts = !(this.carritos.length > 0);
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

  // editarCarrito(carritoId: number){

  //   this.carritoService.deleteCarrito(carritoId).subscribe(
  //     (response: any) => {
  //       this.respuesta = response;
  //       this.obtenerCarritos();
  //     },
  //     (error) => {
  //       console.error('Error al eliminar el carrito', error)
  //     }
  //   );
  // }

  hacerPedido(negocioId: number, carritoId: number, total: any, nombreNegocio: string){
    
    this.openPedidoModal(negocioId, carritoId, total, nombreNegocio);
  }

  async obtenerUserId(){
    this.usuarioId = parseInt(await this.storageService.read('userId'));
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

    return await modal.present();
  }


}
