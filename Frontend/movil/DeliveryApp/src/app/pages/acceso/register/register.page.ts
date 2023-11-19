import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { UserRegister } from 'src/app/shared/dtos/seguridad/user-register';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers : [AuthService]
})
export class RegisterPage implements OnInit {

  
  registerForm!: FormGroup;
  datos: UserRegister = {email: '', contraseña: '', fotoPerfilUrl: '', nombre: '', telefono: '', facultadId: 1};

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      facultadId: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  onSubmit() {
    if (this.registerForm.valid) {

      this.datos.email = this.registerForm.get('email')?.value;
      this.datos.contraseña = this.registerForm.get('contraseña')?.value;
      this.datos.nombre = this.registerForm.get('nombre')?.value;
      this.datos.telefono = this.registerForm.get('telefono')?.value;
      this.datos.facultadId = this.registerForm.get('facultadId')?.value;

      this.Registrar(this.datos);
    }
  }

  Registrar(datos: UserRegister){
    this.authService.register(datos).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Error al registrar usuario', error);
        this.presentToast(error.error.message);
      }
    );
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
