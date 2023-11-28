import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  public async read(key: string) {
    return (
        (await Preferences.get({key})).value
    );
  }

  public async set(key: string, value:any) {
      await Preferences.set({
          key: key,
          value: value
      });
  }

  public async remove(key:string) {
      await Preferences.remove({key});
  }

  public async clear (){
    await Preferences.clear();
  }


}
