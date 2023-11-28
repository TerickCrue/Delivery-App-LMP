import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/shared/dtos/gestion-producto/producto';
import { ProductoService } from 'src/app/shared/services/http/gestion-negocio/producto.service';
import { NegocioService } from 'src/app/shared/services/http/gestion-negocio/negocio.service';
import { DetalleProductoComponent } from '../detalle-producto-modal/detalle-producto.component';
import { menuOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StorageService } from 'src/app/shared/services/storage.service';

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

  usuarioId: number; //= parseInt(localStorage.getItem('userId') || '', 10);

  negocioId: any;
  productos: Producto[] = [];
  negocio: any;
  protected loaded: boolean = false;

  constructor( 
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private negocioService: NegocioService,
    private router: Router,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    
  ) { addIcons({menuOutline}) }


  ngOnInit() {
    this.obtenerUserId();
    this.negocioId = this.route.snapshot.paramMap.get('negocioId');

    // setTimeout( () => {
    //   this.obtenerNegocio();
    //   this.obtenerProductos();
    // }, 1000);

    this.obtenerNegocio();
    this.obtenerProductos();
  }

  ionViewWillEnter(){
    this.obtenerUserId();
  }

  obtenerProductos() {
    this.productoService.getProductosByNegocioId(this.negocioId).subscribe(
      (productos) => {
        this.productos = productos;
        this.loaded = true;
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
        this.loaded = true;
      },
      (error) => {
        console.error('Error al obtener el negocio', error);
      }
    );
  }

  verProducto(productoId: number) {
    this.openProductoModal(productoId);
  }

  async obtenerUserId(){
    this.usuarioId = parseInt(await this.storageService.read('userId'));
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
