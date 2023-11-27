import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule} from '@angular/router';
import { NegocioService } from 'src/app/shared/services/http/gestion-negocio/negocio.service';
import {cart} from 'ionicons/icons'
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DashboardPage implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);

  listaNegocios: any[] = [];

  constructor(private negocioService: NegocioService, private router: Router) { addIcons({cart})}

  
  ngOnInit() {
    this.obtenerNegocios();
  }

  obtenerNegocios() {
    this.negocioService.getAllNegocios().subscribe(
      (response: any) => {
        this.listaNegocios = response;
      },
      (error) => {
        console.error('Error al obtener la lista de negocios:', error);
      }
    );
  }

  verProductos(negocioId: number) {
    //arreglar
    //this.router.navigate(['home/dashboard/detalle-negocio', negocioId]);
    this.router.navigate(['home/detalle-negocio', negocioId]);
  }

  verCarritos() {
    //arreglar
    //this.router.navigate(['home/dashboard/carritos', this.usuarioId]);

    this.router.navigate(['home/carritos', this.usuarioId]);

  }

  


}
