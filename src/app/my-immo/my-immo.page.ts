import { Component, OnInit } from '@angular/core';
import {convertIntToPriceComat} from "../providers/functions-globales/functions-globales";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {NavigationExtras, Router} from "@angular/router";
import {DataUsersProvider} from "../providers/data-users/data-users";
import {DataImtesProvider} from "../providers/data-imtes/data-imtes";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-my-immo',
  templateUrl: './my-immo.page.html',
  styleUrls: ['./my-immo.page.scss'],
})
export class MyImmoPage {

  load = false;
  loader: any;
  imtes: any = [];
  constructor(public translate: TranslateService, public local: LocalStorageProvider, public navCtrl: Router,  public dataUser: DataUsersProvider, public dataImte: DataImtesProvider, public loadingCtrl: LoadingController) {
    // console.log('User:  ' + u);
    this.loadImmo();
  }

  ionViewDidLoad() {
    // this.loadImmo();
    console.log('ionViewDidLoad MyImmoPage');
  }

  addImmo() {
    this.navCtrl.navigate(['my-immo/add-immo']);
  }

  async loadImmo() {
    this.loader = await this.loadingCtrl.create({
      message: this.translate.instant('LOADING')
      // content: this.translate.instant('LOADING')
    });
    this.loader.present();
    this.local.getUser().then((u: any) => {
      if (u != null) {
        const usr = JSON.parse(u);
        console.log(usr);
        this.dataUser.getImmosUser(usr.user_id).subscribe(
          next => {
            this.imtes = next;
            this.imtes.forEach(i => {
              if (i.mode === 'Hotel' || i.mode === 'Proposition') {
                i['prixMin'] = i.prix.split(' | ')[0];
                i['prixMax'] = i.prix.split(' | ')[1];
                if (i.mode === 'Proposition') {
                  i['surfMin'] = i.superficie.split(' | ')[0];
                  i['surfMax'] = i.superficie.split(' | ')[1];
                }
              }
              if (i.images.length === 0)
                i['images'] = [{'id': 0, 'path': this.dataImte.getUrlImg() + 'default-immo.jpg'}];
              else {
                i.images.forEach(im => {
                  im.path = this.dataImte.getUrlImg() + im.nom;
                });
              }
            });
            console.log(this.imtes);
            // this.navCtrl.setRoot('ProfilePage');
          },
          error => {
            console.log(error);
            this.load = true;
            this.loader.dismiss();
          }, () => {
            this.load = true;
            this.loader.dismiss();
            console.log('Complete!');
          }
        );
      } else {
        this.load = true;
        this.loader.dismiss();
      }
    });
  }

  getPrice(p) {
    return convertIntToPriceComat(p);
  }

  goToDetail(imte) {
    let nav: NavigationExtras = {
      queryParams: {
        imte: JSON.stringify(imte)
      }
    }
    this.navCtrl.navigate(['detail-immo'],  nav);
  }

}
