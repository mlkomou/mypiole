import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {NavigationExtras, Router} from "@angular/router";
import {DataImtesProvider} from "../providers/data-imtes/data-imtes";
import {SearchPage} from "../modal/search/search.page";
import {formatterTimeStampToString} from "../providers/functions-globales/functions-globales";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})
export class PromotionPage {

  imtes: any = [];
  mode: any;
  prms: any;
  load = false;
  result = false;
  loader: any;
  prixMin: any = 0;
  prixMax: any = 0;
  loading: any = '';
  villes: any = [];
  locat: any = '';
  locatVille: any = '';
  noLocatVille: any;
  noLocat: any;
  type: any = '';
  noType: any = false;
  prix: any = '';
  surface: any = '';
  chambre: any = '';
  locations = [];
  locationsVille = [];
  types = [];
  quartiers: any = [];
  isLoc: any = true;
  textLoc: any = 'Location';
  textBienQtier: any = '';
  textAutre: any = '';
  constructor(public translate: TranslateService, public toastCtrl: ToastController, public local: LocalStorageProvider, public navCtrl: Router, public dataImte: DataImtesProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    // this.searchs();
    this.loadVilles();
    this.locat = translate.instant('QUARTIER');
    this.locatVille = translate.instant('CITY');
    this.type = translate.instant('TYPE_BIEN');
    this.textBienQtier = translate.instant('MSG.PUTTYPEANDCITY');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionPage');
  }


  searchCriteria(value) {
    console.log(value);
    this.loadModal({modal: value, mode: 'Prop', villes: this.villes});
  }

  async loadModal(vl) {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      componentProps: {
        data: vl
      }
    });
    modal.onDidDismiss().then((val: any) => {
      console.log(val);
      if (val !== null && val !== '' && val !== undefined) {
        // console.log(vl.modal);
        if (vl.modal === 'LocationVille') {
          this.locationsVille = val;
          this.locatVille = val.length > 0 ? val.length > 1 ? val[0] + ' ' + this.translate.instant('AND') + ' ' + (val.length - 1) + ' ' + this.translate.instant('OTHER') : val[0] : this.translate.instant('CITY');
          this.noLocatVille = val.length > 0 ? true : false;
        }
        if (vl.modal === 'LocationQtier') {
          this.locations = val;
          this.locat = val.length > 0 ? val.length > 1 ? val[0] + ' ' + this.translate.instant('AND') + ' ' + (val.length - 1) + ' ' + this.translate.instant('OTHER') : val[0] : this.translate.instant('QUARTIER');
          this.noLocat = val.length > 0 ? true : false;
        } else if (vl.modal === 'Type') {
          this.types = val;
          this.type = val.length > 0 ? val.length > 1 ? val[0] + ' ' + this.translate.instant('AND') + ' ' + (val.length - 1) + ' ' + this.translate.instant('OTHER') : val[0] : this.translate.instant('TYPE_BIEN');
          this.noType = val.length > 0 ? true : false;
        } else {
          // vl.modal === 'Person' ? this.pers = val : vl.modal === 'Depart' ? this.vle_dep = val : vl.modal === 'Arrive' ? this.vle_arr = val : '';
        }
      }
    });
    await modal.present();
  }

  searchImmo(type) {
    let devise = '';
    const prms = {
      'mode': type,
      'location': this.isLoc,
      'lieux': this.locations,
      'type': this.types,
      'criterias': [],
      'prixMin': this.prixMin,
      'devise': devise,
      'prixMax': this.prixMax
    };
    console.log(prms);
    let nav: NavigationExtras = {
      queryParams: {
        prms: JSON.stringify(prms)
      }
    }
    this.navCtrl.navigate(['immo'],  nav);
  }

  since(d) {
    formatterTimeStampToString(d);
  }

  loadVilles() {
    this.local.getVilles().then((rep: any) => {
      if (rep !== null) {
        this.villes = JSON.parse(rep);
      }
    });
  }

  isLocat() {
    console.log(this.isLoc);
    if (this.isLoc) this.textLoc = this.translate.instant('LOCAT');
    else this.textLoc = this.translate.instant('BUY');
  }

  async noSearch() {
    const toast = await this.toastCtrl.create({
      message: this.textBienQtier,
      duration: 3000
    });
    await toast.present();
  }
}

