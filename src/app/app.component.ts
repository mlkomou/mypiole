import {Component, NgZone, ViewChild} from '@angular/core';
import {Platform, NavController, ModalController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {Network} from "@awesome-cordova-plugins/network/ngx";
import {NetworkProvider} from "./providers/network/network";
import {SplashPage} from "./splash/splash.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/tabs/home', icon: 'home' },
    { title: 'Favorie', url: '/tabs/favory', icon: 'heart' },
    { title: 'Promotion', url: '/tabs/promotion', icon: 'cash' },
    { title: 'Alerts', url: '/tabs/notification', icon: 'notifications' },
    { title: 'Profile', url: '/tabs/profile', icon: 'person' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private plt: Platform,
              translate: TranslateService, platform: Platform, ngZone: NgZone, public network: Network, public networkProvider: NetworkProvider, private modalCtrl: ModalController
              ) {

    platform.ready().then(() => {
      // statusBar.backgroundColorByHexString("#212121");
      // statusBar.styleLightContent();
      translate.addLangs(["en", "fr", "es", "ar"]);
      translate.setDefaultLang('en');

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr|es|ar/) ? browserLang : 'en');

      // statusBar.styleDefault();
      this.presentModal();

    });
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SplashPage
    });
    return await modal.present();
  }
  openPage(page): void {
    // this.navCtrl.navigateRoot(page.component);
  }
}
