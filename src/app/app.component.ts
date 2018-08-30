import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import * as db from 'firebase';
import { Firebase } from "@ionic-native/firebase";

const config = {
   apiKey: "AIzaSyBVgeu8rHMYNXcCxz4zMEtKlPZdWiqrL3c",
   authDomain: "notificaciones-1d438.firebaseapp.com",
   databaseURL: "https://notificaciones-1d438.firebaseio.com",
   projectId: "notificaciones-1d438",
   storageBucket: "notificaciones-1d438.appspot.com",
   messagingSenderId: "360899227971"
 };
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  ref = db.database().ref('tokens/');

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private firebase : Firebase) {
    let informacion = db.database().ref('tokens/').push();

    platform.ready().then(() => {
      this.firebase.getToken().then(token => {
         console.log(token); let data = { 'token':token } ;informacion.set(data); 
       }).catch(err=> console.log(err));
      this.firebase.onNotificationOpen().subscribe(data=>{
        console.log(data);
      },err => console.log(err));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      db.initializeApp(config);
    });

  }

}
