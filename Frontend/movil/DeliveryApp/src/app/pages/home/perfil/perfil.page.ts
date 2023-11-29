import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from 'src/app/shared/services/http/gestion-usuario/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { trophyOutline, 
  heartOutline, 
  helpOutline, 
  chatbubblesOutline, 
  settingsOutline, 
  pencilOutline, 
  logOutOutline,
} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PerfilPage implements OnInit {

  usuarioId: number; 
  usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
  ){ addIcons({
      trophyOutline, 
      heartOutline, 
      helpOutline, 
      chatbubblesOutline, 
      settingsOutline, 
      pencilOutline, 
      logOutOutline,})
    }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.obtenerUserId().then( 
      res => {
        this.obtenerInfoUsuario();
      }
      
    )
  }

  obtenerInfoUsuario(){
    console.log(this.usuarioId);
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

  async obtenerUserId(){
    this.usuarioId = parseInt(await this.storageService.read('userId'));
  }

  cerrarSesion(){
    this.authService.logOut();
    this.router.navigate(['acceso']);
  }

}
