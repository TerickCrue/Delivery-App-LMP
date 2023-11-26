import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/shared/dtos/gestion-producto/producto';
import { ProductoService } from 'src/app/shared/http/gestion-negocio/producto.service';
import { NegocioService } from 'src/app/shared/http/gestion-negocio/negocio.service';
import { DetalleProductoComponent } from '../detalle-producto-modal/detalle-producto.component';


@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
  ]
})
export class DetalleNegocioComponent  implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);
  negocioId: any;
  productos: Producto[] = [];
  negocio: any;

  constructor( 
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private negocioService: NegocioService,
    private router: Router,
    private modalCtrl: ModalController,
    
  ) { }


  ngOnInit() {
    this.negocioId = this.route.snapshot.paramMap.get('negocioId');
    this.obtenerNegocio();
    this.obtenerProductos();
  
  }

  obtenerProductos() {
    this.productoService.getProductosByNegocioId(this.negocioId).subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  obtenerNegocio() {
    this.negocioService.getNegocioById(this.negocioId).subscribe(
      (resultado) => {
        this.negocio = resultado;
      },
      (error) => {
        console.error('Error al obtener el negocio', error);
      }
    );
  }

  verProducto(productoId: number) {
    this.openProductoModal(productoId);
  }

  async openProductoModal(productoId: number){
    const modal = await this.modalCtrl.create({
      component: DetalleProductoComponent,
      componentProps:{

        usuarioId: this.usuarioId,
        productoId: productoId,
        negocioId: this.negocioId
      }
    });
    return await modal.present();
  }


}
