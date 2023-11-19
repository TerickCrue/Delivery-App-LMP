import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from 'src/app/shared/http/gestion-usuario/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PerfilPage implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);
  usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.obtenerInfoUsuario();
  }

  ionViewWillEnter(){
    this.obtenerInfoUsuario();
  }

  obtenerInfoUsuario(){
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe(
      (response: any) => {
        this.usuario = response;
      },
      (error) => {
        console.error('Error al obtener la información del usuario', error)
      }
    );
  }

  editarInfo() {
    this.router.navigate(['home/detalles-perfil', this.usuarioId]);
  }

  cerrarSesion(){
    this.authService.logOut();
    this.router.navigate(['acceso']);
  }

}
