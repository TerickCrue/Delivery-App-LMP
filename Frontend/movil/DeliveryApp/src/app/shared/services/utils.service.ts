import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router);

  constructor() { }

  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  removeFromLocalStorage(key: string){
    return localStorage.removeItem(key);
  }



  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una foto',
      promptLabelPicture: 'Toma una foto',
    });

  }

}
