import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { UserLogin } from 'src/app/shared/dtos/seguridad/user-login';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, RouterLink} from '@angular/router';
import { LoginService } from 'src/app/shared/services/http/seguridad/login.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers : [ AuthService ]
})
export class LoginPage implements OnInit {
  
  loginForm!: FormGroup;
  datos: UserLogin = {email: '', pwd: ''}

  constructor(
    private formBuilder: FormBuilder,
    //private authService: AuthService,
    private storageService: StorageService,
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {

    if (this.loginForm.valid) {
      this.datos.email = this.loginForm.get('email')?.value;
      this.datos.pwd = this.loginForm.get('password')?.value;
      this.Autenticar(this.datos);
    }

  }

  Autenticar(datos: UserLogin){
    this.loginService.login(datos).subscribe(
      (response: any) => {
        console.log(response);
        this.storageService.set('userToken', response.token);
        this.storageService.set('userId', JSON.stringify(response.id));
        //localStorage.setItem('token', response.token);
        //localStorage.setItem('userId', response.id);
        
        // Redirigir a la página de inicio
        this.router.navigate(['/home'])
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.presentToast(error.error.message)
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
