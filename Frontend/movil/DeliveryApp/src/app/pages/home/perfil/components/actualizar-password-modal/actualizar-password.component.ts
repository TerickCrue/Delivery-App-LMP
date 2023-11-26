import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { PasswordChange } from 'src/app/shared/dtos/gestion-perfil/password-change';
import { UsuarioService } from 'src/app/shared/http/gestion-usuario/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import {closeCircleOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-actualizar-password',
  templateUrl: './actualizar-password.component.html',
  styleUrls: ['./actualizar-password.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule

  ]
})
export class ActualizarPasswordComponent  implements OnInit {

  userId: any;
  ActualPwd: string = '';
  NewPwd: string = '';
  NewPwd2: string = '';
  cambioContrasenaForm!: FormGroup;
  mensaje: any;
  request: PasswordChange = {contraseñaActual: '', contraseñaNueva: ''};


  constructor( 
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    addIcons({closeCircleOutline})

    this.cambioContrasenaForm = this.formBuilder.group({
      contraActual: ['', Validators.required],
      nuevaContra: ['', Validators.required],
      confirmarNuevaContra: ['', Validators.required]
    });

  }


  ngOnInit() {}


  cambiarContra() {

    if (this.cambioContrasenaForm.valid) {

      this.ActualPwd = this.cambioContrasenaForm.get('contraActual')?.value;
      this.NewPwd = this.cambioContrasenaForm.get('nuevaContra')?.value;
      this.NewPwd2 = this.cambioContrasenaForm.get('confirmarNuevaContra')?.value;

      if(this.NewPwd === this.NewPwd2)
      {
        this.request.contraseñaActual = this.ActualPwd;
        this.request.contraseñaNueva = this.NewPwd;

        this.usuarioService.updatePasswordUsuario(this.userId, this.request).subscribe(
          (response: any) => {
            this.mensaje = response;
            console.log(this.mensaje);
            this.presentToast("contraseña actualizada");
          },
          (error) => {
            console.error('error al cambiar la contraseña', error);
            this.presentToast(error.error.message);
          }
        );

      }
      else{
        console.error('Las contraseñas no coinciden')
        this.presentToast('Las contraseñas no coinciden');
      }
    }
    
  }

  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
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
