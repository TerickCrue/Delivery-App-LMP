import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PedidoRequest } from 'src/app/shared/dtos/gestion-pedido/pedido-request';
import { PedidoService } from 'src/app/shared/http/gestion-negocio/pedido.service';
import { FormsModule } from '@angular/forms';
import {closeCircleOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class RealizarPedidoComponent  implements OnInit {

  usuarioId: any;
  negocioId: any;
  carritoId: any;
  totalCarrito: any;
  nombreNegocio: any;

  direccionEntrega: any;
  metodoPago: any;
  
  pedido: PedidoRequest = { userId: 0, businessId: 0, carritoId: 0, 
    direccionEntrega: '', metodopagoId: 0, total: 0, status: ''}

  constructor(
    private pedidoService: PedidoService,
    private modalCtrl: ModalController,
    private router: Router
  ) { addIcons({closeCircleOutline})}

  ngOnInit() {}



  realizarPedido() {

    this.pedido = {carritoId: this.carritoId, 
      businessId: this.negocioId, userId: this.usuarioId, 
      direccionEntrega: this.direccionEntrega, 
      metodopagoId: this.metodoPago, total: this.totalCarrito, status: ""
    }
    
    this.pedidoService.crearPedido(this.pedido).subscribe(
      (response) => {
        this.close();
      },
      (error) => {
        console.error('Error al hacer el pedido', error);
      }
    );
  }

  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
