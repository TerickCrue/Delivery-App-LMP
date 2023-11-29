import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {ActualizarPasswordComponent} from '../actualizar-password-modal/actualizar-password.component'
import {ActualizarEmailComponent} from '../actualizar-email-modal/actualizar-email.component'
import {cameraOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { UsuarioService } from 'src/app/shared/services/http/gestion-usuario/usuario.service';
import { UsuarioRequest } from 'src/app/shared/dtos/gestion-perfil/usuario-request';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';


@Component({
  selector: 'app-detalles-perfil',
  templateUrl: './detalles-perfil.component.html',
  styleUrls: ['./detalles-perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DetallesPerfilComponent  implements OnInit {

  utilsService = inject(UtilsService);
  firebaseService = inject(FirebaseService);

  usuarioId: any;
  perfilForm!: FormGroup;
  
  fotoPerfilUrl: string;
  fotoCambiada = false;
  usuarioData: UsuarioRequest;


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
    
  ) { addIcons({cameraOutline}) }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      facultad: [Validators.required],
      fotoPerfil: [''],
    });
    this.usuarioId = this.route.snapshot.paramMap.get('usuarioId');
    
    this.obtenerInfo();
  }

  ionViewWillEnter(){
    this.fotoCambiada = false;
  }

  ionViewDidEnter(){
    this.obtenerInfo();
  }

  obtenerInfo(){
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe(
      (response:any) => {
        this.usuarioData = response;
      },
      (error) => {
        console.error('Error al obtener la información', error)
      }
    );
  }

  enviarInfo(){
    this.usuarioService.updateUsuario(this.usuarioId, this.usuarioData).subscribe(
      (response:any) => {
        console.log(response)
      },
      (error) => {
        console.error('Error al guardar la información')
      }
    );
  }

  cambiarContra(){
    this.openPwdChangeModal(this.usuarioId);
  }

  cambiarEmail(){
    this.openEmailChangeModal(this.usuarioId);
    this.obtenerInfo();
  }

  async openPwdChangeModal(usuarioId: number){
    const modal = await this.modalCtrl.create({
      component: ActualizarPasswordComponent,
      componentProps:{
        userId: usuarioId,
      }
    });
    return await modal.present();
  }

  async openEmailChangeModal(usuarioId: number){
    const modal = await this.modalCtrl.create({
      component: ActualizarEmailComponent,
      componentProps:{
        userId: usuarioId,
        userEmail: this.usuarioData.email
      }
    });
    return await modal.present();
  }

  async takeImage(){
    const dataUrl = (await this.utilsService.takePicture('Foto de perfil')).dataUrl;
    this.fotoPerfilUrl = dataUrl;
    this.fotoCambiada = true;
  }

  async subirFotoDePerfil(){
    let dataUrl = this.fotoPerfilUrl;
    let imagePath = `users/${this.usuarioId}/${Date.now()}`;
    let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
    this.usuarioData.fotoPerfilUrl = imageUrl;
  }

  async guardarPerfil() {
    if (this.perfilForm.valid) {
      this.usuarioData.id = this.usuarioId;
      this.usuarioData.nombre = this.perfilForm.get('nombre')?.value;
      this.usuarioData.telefono = this.perfilForm.get('telefono')?.value;
      this.usuarioData.facultadId = this.perfilForm.get('facultad')?.value;
      this.usuarioData.contraseña = "";
      if(this.fotoCambiada){
        await this.subirFotoDePerfil();
      }

      this.enviarInfo();
    }
  }


}
