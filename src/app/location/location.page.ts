import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {LoadingController, ModalController, NavController, NavParams, Platform, ToastController} from "@ionic/angular";
import {convertIntToPrice} from "../providers/functions-globales/functions-globales";
import {DataLocationsProvider} from "../providers/data-locations/data-locations";
import {SearchPage} from "../modal/search/search.page";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  pet: string = "searchLocat";
  pet2: string = "searchTerrain";
  pet3: string = "searchHotel";
  pet4: string = "searchMeuble";
  isAndroid: boolean = false;
  locat: any = '';
  locatVille: any = '';
  noLocat: any;
  noLocatVille: any;
  type: any = '';
  noType: any = false;
  prix: any = '';
  noPrix: any = false;
  surface: any = '';
  noSurface: any = false;
  piece: any = '';
  noPiece: any = false;
  chambre: any = '';
  noChambre: any = false;
  criteria: any = '';
  noCriteria: any = false;
  locations = [];
  locationsVille = [];
  types = [];
  crtrias = [];
  prixMin: any = 0;
  prixMax: any = 0;
  surfMin: any = 0;
  surfMax: any = 0;
  quartiers: any = [];
  villes: any = [];
  mode: any;
  isLoc: any = true;
  textLoc: any = 'Location';
  textAddColoc: any = '';
  textAddHotel: any = '';
  textAddMeuble: any = '';
  textAddTerr: any = '';
  textBienQtier: any = '';
  textEntre: any = '';
  textEt: any = '';
  textAutre: any = '';
  textFrom: any = '';
  textUntil: any = '';
  textLocat: any = '';
  textBuy: any = '';
  device: any = '';
  searchChoice: any = '';
  constructor(public translate: TranslateService,
              public local: LocalStorageProvider,
              public toastCtrl: ToastController,
              platform: Platform,
              public navParams: NavParams,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public dataLocation: DataLocationsProvider,
              public loadingCtrl: LoadingController,
              private router: Router,
              private route: ActivatedRoute
              ) {
    this.isAndroid = platform.is('android');
     this.route.queryParams.subscribe((query: any) => {
       this.mode = query.mode;
       if (this.mode === 'Locat' || this.mode === 'Coloc' || this.mode === 'Hotel') {
         this.loadQuartiers();
         if (this.mode === 'Coloc') {
           this.type = 'Co-Location';
           this.types.push('Co-Location');
         } else if (this.mode === 'Hotel') {
           this.type = 'Hotel';
           this.types.push('Hotel');
         }
       } else {
         this.loadVilles();
       }
    });

    this.loadVilles();
    this.textAddColoc = translate.instant('MSG.ADD_COLOC');
    this.textAddHotel = translate.instant('MSG.ADD_HOTEL');
    this.textAddMeuble = translate.instant('MSG.ADD_MEUBLE');
    this.textAddTerr = translate.instant('MSG.ADD_TERRAIN');
    this.textBienQtier = translate.instant('MSG.PUTTYPEANDQUARTER');
    this.locat = translate.instant('QUARTIER');
    this.locatVille = translate.instant('CITY');
    this.criteria = translate.instant('ADD_CRITERIA');
    this.type = translate.instant('TYPE_BIEN');
    this.prix = translate.instant('BUDGET');
    this.chambre = translate.instant('FROM');
    this.textFrom = translate.instant('FROM');
    this.piece = translate.instant('FROM');
    this.surface = translate.instant('SURFACE');
    this.textEntre = translate.instant('BETWEEN');
    this.textEt = translate.instant('AND');
    this.textAutre = translate.instant('OTHER');
    this.textUntil = translate.instant('UNTIL');
    this.textLoc = translate.instant('LOCAT');
    this.textLocat = translate.instant('LOCAT');
    this.textBuy = translate.instant('BUY');
    this.searchChoice = translate.instant('SEARCH_CHOICE');
  }

  searchCriteria(value) {
    this.loadModal({ modal: value, quartiers: this.quartiers, mode: this.mode, villes: this.villes });
  }

  async loadModal(vl) {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      componentProps: {
        data: vl
      }
    });
    await modal.present();
     modal.onDidDismiss().then((val: any) => {
       console.log('onDidDismiss', val);
      if (val !== null && val !== '' && val !== undefined) {
        if (vl.modal === 'LocationVille') {
          this.locationsVille = val;
          this.locatVille = val.length > 0 ? val.length > 1 ? val[0] + ' ' + this.textEt + ' ' + (val.length - 1) + ' ' + this.textAutre : val[0] : this.locatVille;
          this.noLocatVille = val.length > 0 ? true : false;
        }
        if (vl.modal === 'LocationQtier') {
          this.locations = val;
          this.locat = val.length > 0 ? val.length > 1 ? val[0] + ' ' + this.textEt + ' ' + (val.length - 1) + ' ' + this.textAutre : val[0] : this.locat;
          this.noLocat = val.length > 0 ? true : false;
        } else if (vl.modal === 'Criteria') {
          this.crtrias = val;
          this.criteria = val.length > 0 ? val.length > 1 ? val[0] + ' ' + this.textEt + ' ' + (val.length - 1) + ' ' + this.textAutre : val[0] : this.criteria;
          this.noCriteria = val.length > 0 ? true : false;
        } else if (vl.modal === 'Type') {
          this.types = val;
          this.type = val.length > 0 ? val.length > 1 ? this.translator(val[0]) + ' ' + this.textEt + ' ' + (val.length - 1) + ' ' + this.textAutre : this.translator(val[0]) : this.type;
          this.noType = val.length > 0 ? true : false;
        } else if (vl.modal === 'Prix') {
          if (val.min !== undefined || val.max !== undefined) {
            this.noPrix = true;
            this.device = val.device;
            if (val.min !== undefined && val.max !== undefined) {
              let min = parseInt(val.min);
              let max = parseInt(val.max);
              this.prixMin = min < max ? min : max;
              this.prixMax = min > max ? min : max;
              this.prix = this.textEntre + ' ' + convertIntToPrice(this.prixMin + '') + ' ' + this.textEt + ' ' + convertIntToPrice(this.prixMax + '') + val.device;
            } else {
              if (val.min !== undefined && val.min !== 0 && val.min !== '0') {
                let min = parseInt(val.min);
                this.prix = this.textFrom + ' ' + convertIntToPrice(min + '') + val.device;
                this.prixMin = min;
                this.prixMax = 0;
              } else if (val.max !== undefined && val.max !== 0 && val.max !== '0') {
                let max = parseInt(val.max);
                this.prix = this.textUntil + ' ' + convertIntToPrice(max + '') + val.device;
                this.prixMax = max;
                this.prixMin = 0;
              }
            }
          } else {
            // this.device = '';
          }
        } else if (vl.modal === 'Surface') {
          if (val.min !== undefined || val.max !== undefined) {
            this.noSurface = true;
            if (val.min !== undefined && val.max !== undefined) {
              let min = parseInt(val.min);
              let max = parseInt(val.max);
              this.surfMin = min < max ? min : max;
              this.surfMax = min > max ? min : max;
              this.surface = this.textEntre + ' ' + convertIntToPrice(this.surfMin + '') + ' ' + this.textEt + ' ' + convertIntToPrice(this.surfMax + '');
            } else {
              if (val.min !== undefined && val.min !== 0 && val.min !== '0') {
                let min = parseInt(val.min);
                this.surface = this.textFrom + ' ' + convertIntToPrice(min + '');
                this.surfMin = val.min;
                this.surfMax = 0;
              } else if (val.max !== undefined && val.max !== 0 && val.max !== '0') {
                let max = parseInt(val.max);
                this.surface = this.textUntil + ' ' + convertIntToPrice(max + '');
                this.surfMax = val.max;
                this.surfMin = 0;
              }
            }
          }
        } else {
          // vl.modal === 'Person' ? this.pers = val : vl.modal === 'Depart' ? this.vle_dep = val : vl.modal === 'Arrive' ? this.vle_arr = val : '';
        }
      }
    });
  }

  searchImmo(type) {
    let prms = {};
    let devise = this.device;
    if (type === 'Immo') {
      prms = {
        'mode': type,
        'location': this.isLoc,
        'villes': this.locationsVille,
        'lieux': this.locations,
        'type': this.types,
        'criterias': this.crtrias,
        'prixMin': this.prixMin,
        'devise': devise,
        'prixMax': this.prixMax
      };
    }
    else if (type === 'Terrain') {
      prms = {
        'mode': type,
        'location': this.isLoc,
        'villes': this.locationsVille,
        'lieux': this.locations,
        'criterias': this.crtrias,
        'type': this.types,
        'prixMin': this.prixMin,
        'prixMax': this.prixMax,
        'surfMin': this.surfMin,
        'devise': devise,
        'surfMax': this.surfMax
      };
    }
    else if (type === 'Hotel') {
      prms = {
        'mode': type,
        'location': this.isLoc,
        'villes': this.locationsVille,
        'lieux': this.locations,
        'criterias': this.crtrias,
        'type': this.types,
        'devise': devise,
        'prixMin': this.prixMin,
        'prixMax': this.prixMax
      };
    }
    else if (type === 'Meuble') {
      prms = {
        'mode': type,
        'location': this.isLoc,
        'villes': this.locationsVille,
        'lieux': this.locations,
        'criterias': this.crtrias,
        'type': this.types,
        'devise': devise,
        'prixMin': this.prixMin,
        'prixMax': this.prixMax
      };
    }
    this.navCtrl.navigateForward('immo', prms);
  }

  async noSearch() {
    const toast = await this.toastCtrl.create({
      message: this.textBienQtier,
      duration: 3000
    });
    await toast.present();
  }

  loadQuartiers() {
    this.local.getQuartiers().then((rep: any) => {
      if (rep !== null) {
        this.quartiers = JSON.parse(rep);
      }
    });
  }

  loadVilles() {
    this.local.getVilles().then((rep: any) => {
      if (rep !== null) {
        this.villes = JSON.parse(rep);
      }
    });
  }

  addLocation(type) {
    let nav: NavigationExtras = {
      queryParams: {
        data: JSON.stringify({
          type: type
        })
      }
    };
    this.router.navigate(['my-immo/add-immo'], nav)
  }

  isLocat() {
    if (this.isLoc) this.textLoc = this.textLocat;
    else this.textLoc = this.textBuy;
  }

  translator(val) {
    let browserLang = this.translate.getBrowserLang();
    let lang = browserLang.match(/en|fr|es|ar/) ? browserLang : 'en';
    let value = ''
    if (lang !== 'fr') {
      if (val == 'Maison') value = this.translate.instant('HOUSE');
      else if (val == 'Chambre') value = this.translate.instant('BEDROOM');
      else if (val == 'Studio') value = this.translate.instant('STUDIO');
      else if (val == 'Appartement') value = this.translate.instant('APARTMENT');
      else if (val == 'Entrepot | Magasin') value = this.translate.instant('STORE');
      else if (val == 'Salle') value = this.translate.instant('SALLE');
      else if (val == 'Co-Location') value = this.translate.instant('COLOC');
      else if (val == 'Bureau | Commerce') value = this.translate.instant('OFFICE');
      else if (val == 'Espace Libre') value = this.translate.instant('SPACE_RENTAL');
      else if (val == 'Terrain') value = this.translate.instant('LAND_SALE');
      else if (val == 'Autres') value = this.translate.instant('OTHER');
      return value;
    } else {
      return val;
    }
  }

  ngOnInit(): void {
  }
}
