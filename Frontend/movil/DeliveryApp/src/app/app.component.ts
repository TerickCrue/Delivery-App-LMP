import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent {
  constructor() {}
}
