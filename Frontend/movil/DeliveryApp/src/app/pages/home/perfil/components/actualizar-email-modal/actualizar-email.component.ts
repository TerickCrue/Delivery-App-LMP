import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { EmailChange } from 'src/app/shared/dtos/gestion-perfil/email-change';
import { UsuarioService } from 'src/app/shared/services/http/gestion-usuario/usuario.service';
import {closeCircleOutline} from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-actualizar-email',
  templateUrl: './actualizar-email.component.html',
  styleUrls: ['./actualizar-email.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
  ]

})
export class ActualizarEmailComponent  implements OnInit {

  userId: any;

  cambioEmailForm!: FormGroup;

  userEmail: any;
  NewEmail: string = '';
  //pwd: string = '';
  
  request: EmailChange = {emailActual: '', emailNuevo: '', pwd:''};

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private storageService: StorageService,
  ) { 
    addIcons({closeCircleOutline})
    this.cambioEmailForm = this.formBuilder.group({
      nuevoEmail: ['', Validators.required],
      contra: ['', Validators.required]
    });
  }

  ngOnInit() {}



  cambiarEmail() {
    if (this.cambioEmailForm.valid) {

      this.NewEmail = this.cambioEmailForm.get('nuevoEmail')?.value;
      let pwd = this.cambioEmailForm.get('contra')?.value;

      this.request.emailActual = this.userEmail;
      this.request.emailNuevo = this.NewEmail;
      this.request.pwd = pwd;

      this.usuarioService.updateEmailUsuario(this.userId, this.request).subscribe(
        (response: any) => {

          this.storageService.set('userToken', response.token);
          this.storageService.set('userId', response.id);
          this.presentToast("Email actualizado");
          this.close();

        },
        (error) => {
          console.error(error);
          this.presentToast(error.error.message)
        }
      );
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
