import { Injectable, inject } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  storage = inject(AngularFireStorage);

  constructor() { }



  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
    
  }
}
