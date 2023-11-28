import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PedidoResponse } from 'src/app/shared/dtos/gestion-pedido/pedido-response';
import { PedidoRequest } from 'src/app/shared/dtos/gestion-pedido/pedido-request';
import { PedidoService } from 'src/app/shared/services/http/gestion-negocio/pedido.service';
import { RouterLink, RouterModule } from '@angular/router';
import {trash} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { format } from 'date-fns'
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterModule]
})
export class PedidosPage implements OnInit {
  
  usuarioId: number; //= parseInt(localStorage.getItem('userId') || '', 10);

  pedidos: PedidoResponse[] = [];
  pedidosActivos: PedidoResponse[] = [];
  pedidosInactivos: PedidoResponse[] = [];
  loaded: boolean = false;

  pedido: PedidoRequest = { userId: 0, businessId: 0, carritoId: 0, 
    direccionEntrega: '', metodopagoId: 0, total: 0, status: ''}
  
  constructor(
    private pedidoService: PedidoService,
    private toastController: ToastController,
    private storageService: StorageService,
  ) { addIcons({trash})}

  ngOnInit() {
    // this.obtenerUserId();
    // setTimeout(() =>{
    //   this.getPedidos(this.usuarioId);
    // },);
    this.getPedidos(this.usuarioId);
  }

  ionViewWillEnter(){
    this.obtenerUserId();
    this.getPedidos(this.usuarioId);
    
  }

  

  // ionViewWillEnter(){
  //   this.getPedidos(this.usuarioId);
  // }

  getPedidos(usuarioId: any){
    this.pedidoService.getPedidosByUsuarioId(usuarioId).subscribe(
      (response) => {
        this.pedidos = response.map((pedido) => {
          return {
            ...pedido,
            fecha: format(new Date(pedido.fecha), 'dd/MM/yyyy HH:mm')
          };
        });
        this.separarPedidos();
        this.loaded = true;
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
      }
    )
  }

  separarPedidos() {
    this.pedidosActivos = this.pedidos.filter(
      (pedido) => pedido.status === 'aceptado' || pedido.status === 'pendiente'
    );

    this.pedidosInactivos = this.pedidos.filter(
      (pedido) => pedido.status === 'completado' || pedido.status === 'rechazado'
    );
  }


  eliminarPedido(pedidoId: number){
    this.pedidoService.eliminarPedido(pedidoId).subscribe(
      (response: any) => {
        this.getPedidos(this.usuarioId)
      },
      (error) => {
        console.error("error al eliminar el pedido", error);
        this.presentToast(error.error.message);
      }
    )
  }


  async obtenerUserId(){
    this.usuarioId = parseInt(await this.storageService.read('userId'));
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
