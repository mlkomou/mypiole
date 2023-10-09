import { Component, OnInit } from '@angular/core';
import {DataLocationsProvider} from "../providers/data-locations/data-locations";
import {ModalController, Platform, ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {App, AppInfo} from "@capacitor/app";
import {Router} from "@angular/router";
import { LocalStorageProvider } from "../providers/local-storage/local-storage";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage  {

  quartiers: any = [];
  villes: any = [];

  // @ts-ignore
  constructor(public viewCtrl: ModalController, public local: LocalStorageProvider, public navCtrl: Router,
              public dataLocation: DataLocationsProvider, public toastCtrl: ToastController, public translate: TranslateService,
              public platform: Platform) {
    // Storage.clear().then();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  ionViewDidEnter() {
    this.init();
    this.platform.ready().then(() => {
      // this.uniqueDeviceID.get()
      //   .then((uuid: any) => console.log(uuid))
      //   .catch((error: any) => console.log(error));
    });

  }

  loadQuartiers(nom) {
    this.dataLocation.getQuartiersPays(nom).subscribe(
      next => {
        // console.log(next);
        this.quartiers = next;
      },
      error => {
        this.quartiers = [];
        console.log(error);
      }, () => {
        this.local.addQuartier(this.quartiers).then((rep: any) => {
          // console.log('Result: ' + rep);
        });
      }
    );
  }

  loadVilles(nom) {
    this.dataLocation.getVillesPays(nom).subscribe(
      next => {
        // console.log(next);
        this.villes = next;
      },
      error => {
        this.villes = [];
        console.log(error);
      }, () => {
        this.local.addVille(this.villes).then((rep: any) => {
          // console.log('Result: ' + rep);
        });
      }
    );
  }

  init() {
    let param;
    this.dataLocation.getPrm().subscribe(
      next => {
        param = next[0];
        console.log('onlineParam', param);
      },
      error => {
        console.log(error);
      }, () => {
        console.log(param);
        this.local.getPrm().then((p: any) => {
          console.log('PrmKKKKKKKKKKKK:  ' + p);
          console.log('PrmParsed:  ', JSON.parse(p));

          if (p != null) {
            const prm = JSON.parse(p);
            console.log(prm);
            App.getInfo().then(async (code: AppInfo) => {
              console.log('onlineVersion', param.version);
              console.log('appVersion', code.version);
              if (param.version !== code.version) {
                if (param.obligatoire) {
                  this.navCtrl.navigate(['update']);
                } else {
                  const toast = await this.toastCtrl.create({
                    message: this.translate.instant("UPD_AVAILABLE"),
                    duration: 3000
                  });
                  await toast.present();
                }
              } else {
                console.log('set version to local');
                this.local.addPrm(param).then((rep: any) => {
                  console.log('Result: ' + rep);
                });
              }
            });
          } else {
            console.log('addSplashParam', param);
            this.local.addPrm(param).then((rep: any) => {
              console.log('Result: ' + rep);
            });
          }
        });
        let country = 'Cameroon';
        this.local.getUser().then((u: any) => {
          console.log('User:  ' + u);
          if (u != null) {
            const user = JSON.parse(u);
            console.log(user);
            country = user.pays === 'Cameroun' ? 'Cameroon' : user.pays;
          }
          this.loadQuartiers(country);
          this.loadVilles(country);
        });
        this.local.isNewUser().then((rep: any) => {
          console.log('isNew: ' + rep);
          // this.splashScreen.hide();
          setTimeout(() => {
            if (rep) this.navCtrl.navigate(['loading']);
            this.viewCtrl.dismiss('');
          }, 3000);
        });
      });
  }

}
