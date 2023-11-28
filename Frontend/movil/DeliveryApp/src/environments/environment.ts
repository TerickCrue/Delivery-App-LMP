// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  baseUrl: "https://localhost:44368/api",
  
  firebaseConfig : {
    apiKey: "AIzaSyAUOBryOWP87DXPyCMTpb8ptE4HGUwpQfM",
    authDomain: "deliveryapp-lmp.firebaseapp.com",
    projectId: "deliveryapp-lmp",
    storageBucket: "deliveryapp-lmp.appspot.com",
    messagingSenderId: "906696230072",
    appId: "1:906696230072:web:7204630945e575d59f604d"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
