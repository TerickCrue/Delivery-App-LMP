import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NegocioService } from 'src/app/shared/services/http/gestion-negocio/negocio.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class ReporteComponent  implements OnInit {

  listaNegocios: any[] = [];

  constructor(private negocioService: NegocioService) { }

  ngOnInit() {
    this.obtenerNegocios();
  }

  obtenerNegocios() {
    this.negocioService.getAllNegocios().subscribe(
      (response: any) => {
        console.log(response);
        this.listaNegocios = response;
      },
      (error) => {
        console.error('Error al obtener la lista de negocios:', error);
      }
    );
  }

}
