import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class AccesoPage implements OnInit {

  

  constructor( private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.usuarioLogeado();
  }

  usuarioLogeado(){
    let res = this.authService.isAuthenticated();

    if(res){
      this.router.navigate(['/home']);
    }
  }
  


}
