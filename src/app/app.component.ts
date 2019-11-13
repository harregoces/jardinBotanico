import { Component } from '@angular/core';
import { Environment } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Institucional',
      url: '/institucional',
      icon: 'document'
    },
    {
      title: 'Tarifas y Horarios',
      url: '/tarifas-horarios',
      icon: 'cash'
    },
    {
      title: 'Parqueadero',
      url: '/parqueadero',
      icon: 'bus'
    },
    {
      title: 'Recomendaciones',
      url: '/recomendaciones',
      icon: 'bus'
    },
    {
      title: 'Cerrar Sesion',
      url: '/Cerrar Sesion',
      icon: 'tablet-portrait'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDGODufigYaWvP-Lg2nmzoRkKd3QbqUsR0',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDGODufigYaWvP-Lg2nmzoRkKd3QbqUsR0'
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
