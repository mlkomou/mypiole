import {Component, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Network} from "@awesome-cordova-plugins/network/ngx";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {LoadingController, NavController, ToastController} from "@ionic/angular";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isConnect = false;
  @ViewChild('Slides') slide: any;
  user: any;
  net = true;
  noConnect: any;
  constructor(public translate: TranslateService,
              private router: Router,
              private network: Network, public local: LocalStorageProvider, public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.checkUser();
    this.noConnect = translate.instant("NO_CONNECT");
    this.network.onConnect().subscribe(data => {
      console.log(data)
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data)
    }, error => console.error(error));
  }

  ionViewWillEnter() {
    // this.checkUser();
    // this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.net = false;
    // });
    // this.network.onConnect().subscribe(() => {
    //   console.log('network was connected :-(');
    //   this.net = true;
    // });
    // this.network.onConnect().subscribe(data => {
    //   console.log(data)
    // }, error => console.error(error));

    // this.network.onDisconnect().subscribe(data => {
    //   console.log(data)
    // }, error => console.error(error));
  }

  async goto(p, prm: any = '') {
    console.log(p);
    let nav: NavigationExtras = {
      queryParams: {
        mode: prm
      }
    }
    if (this.net) {
      console.log(prm);
      if (p === 'my-immo') {
        if (this.isConnect) this.navCtrl.navigateForward(p);
        else {
          const toast = await this.toastCtrl.create({
            message: this.noConnect,
            duration: 3000
          });
          await toast.present();
          this.navCtrl.navigateForward('login');
        }
      } else this.router.navigate([p], nav);
    } else {
      const toast = await this.toastCtrl.create({
        message: this.translate.instant("BAD_NETWORK"),
        duration: 3000
      });
      await toast.present();
    }
  }

  checkUser() {
    // this.local.getUser().then((u: any) => {
    //   // console.log('User:  ' + u);
    //   if (u != null) {
    //     const usr = JSON.parse(u);
    //     this.user = usr;
    //     if (usr.connect) {
    //       this.isConnect = true;
    //     } else {
    //       this.isConnect = false;
    //     }
    //   }
    // });
  }
}
