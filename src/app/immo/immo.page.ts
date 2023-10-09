import { Component, OnInit } from '@angular/core';
import {convertIntToPriceComat, formatterTimeStampToString} from "../providers/functions-globales/functions-globales";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {LoadingController, NavController, NavParams, ToastController} from "@ionic/angular";
import {DataImtesProvider} from "../providers/data-imtes/data-imtes";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-immo',
  templateUrl: './immo.page.html',
  styleUrls: ['./immo.page.scss'],
})
export class ImmoPage implements OnInit {

  imtes: any = [];
  mode: any;
  prms: any;
  load = false;
  result = false;
  net = true;
  loader: any;
  prixMin: any = 0;
  prixMax: any = 0;
  textAdd: any = '';
  loading: any = '';
  constructor(public translate: TranslateService,
              public local: LocalStorageProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              public dataImte: DataImtesProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private router: Router) {
    // console.log(navParams);
    // console.log(navParams.data);
    this.prms = navParams.data;
    this.searchImtes();
    this.mode = this.navParams.get('mode');
    this.textAdd = translate.instant("MSG.PROPISITION_SEARCH");
    this.loading = translate.instant("LOADING");
    // this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.net = false;
    // });
    // this.network.onConnect().subscribe(() => {
    //   console.log('network was connected :-(');
    //   this.net = true;
    // });
  }


  ionViewDidLoad() {
    // this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.net = false;
    // }, error => {
    //   console.log(error);
    // });
    // this.network.onConnect().subscribe(() => {
    //   console.log('network was connected :-(');
    //   this.net = true;
    // }, error1 => {
    //   console.log(error1);
    // });
  }

  goToDetail(imte) {
    // const prms = {
    //   'id': id,
    //   'mode': this.mode
    // };
    this.navCtrl.navigateForward('detail-immo', imte);
    // console.log(imte);
  }

  getPrice(p) {
    return convertIntToPriceComat(p);
  }

  addFavorite(favorite) {
    this.local.addFavorite({ ...favorite, 'mode': this.mode }).then((rep: any) => {
      console.log('Result: ' + rep);
    });
  }

  rmFavorite(favorite) {
    this.local.rmFavorite({ ...favorite, 'mode': this.mode }).then((rep: any) => {
      console.log('Result: ' + rep);
    });
  }

  async searchImtes() {
    this.imtes = [];
    let imtes = ['No'];
    const loader = await this.loadingCtrl.create({
      message: this.loading
    });
    await loader.present();
    console.log(this.prms);
    this.dataImte.searchImmo(this.prms).subscribe(
      next => {
        this.imtes = next;
        imtes = next;
        this.imtes.forEach((i, c) => {
          if (i.mode === 'Hotel' || i.mode === 'Meuble' || i.mode === 'Proposition') {
            i['prixMin'] = i.prix.split(' | ')[0];
            i['prixMax'] = i.prix.split(' | ')[1];
            if (i.mode === 'Proposition' || i.mode === 'Meuble') {
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
          let d = new Date(i.date_creation).getTime();
          i['isFavorite'] = false;
          i['since'] = formatterTimeStampToString(d);
          this.local.getFavorites().then((rep: any) => {
            if (rep !== null) {
              let favorites = JSON.parse(rep);
              if (favorites.length > 0) {
                favorites.forEach(f => {
                  if (f.id === i.id && f.type === i.type) {
                    i.isFavorite = true;
                  }
                });
              }
            }
          });
          if (this.imtes.length === c + 1) this.load = true;
        });
      },
      error => {
        console.log(error);
        this.imtes = [];
        imtes = [];
        this.load = true;
        this.result = true;
        loader.dismiss();
      }, async () => {
        if (this.imtes.length > 0) {
          if (this.imtes.length === 0) this.load = true;
          console.log(this.imtes);
          this.result = true;
          loader.dismiss();
        } else {
          const toast = await this.toastCtrl.create({
            message: this.translate.instant("FIND_ALL"),
            duration: 5000
          });
          toast.present();
          this.prms.lieux = [];
          console.log(this.prms);
          this.dataImte.searchImmo(this.prms).subscribe(
            next => {
              this.imtes = next;
              imtes = next;
              this.imtes.forEach((i, c) => {
                if (i.mode === 'Hotel' || i.mode === 'Meuble' || i.mode === 'Proposition') {
                  i['prixMin'] = i.prix.split(' | ')[0];
                  i['prixMax'] = i.prix.split(' | ')[1];
                  if (i.mode === 'Proposition' || i.mode === 'Meuble') {
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
                let d = new Date(i.date_creation).getTime();
                i['isFavorite'] = false;
                i['since'] = formatterTimeStampToString(d);
                this.local.getFavorites().then((rep: any) => {
                  if (rep !== null) {
                    let favorites = JSON.parse(rep);
                    if (favorites.length > 0) {
                      favorites.forEach(f => {
                        if (f.id === i.id && f.type === i.type) {
                          i.isFavorite = true;
                        }
                      });
                    }
                  }
                });
                if (this.imtes.length === c + 1) this.load = true;
              });
            },
            error => {
              console.log(error);
              this.imtes = [];
              imtes = [];
              this.load = true;
              this.result = true;
              loader.dismiss();
            }, () => {
              if (this.imtes.length === 0) this.load = true;
              console.log(this.imtes);
              this.result = true;
              loader.dismiss();
            }
          );
        }
      }
    );
    // if (this.net) {
    // var timesRun = 0;
    // var interval = setInterval(() => {
    //
    // }, 1000);
    // setTimeout(() => {
    //   this.load = true;
    //   this.result = true;
    //   loader.dismiss();
    //   clearInterval(interval);
    //   console.log('stop2');
    // }, 15000);
    // console.log('heyyy');
  }

  since(d) {
    formatterTimeStampToString(d);
  }

  addLocation(mode) {
    let nav: NavigationExtras = {
     queryParams: {
       data: JSON.stringify({
         type: 'Proposition',
         mode: mode
       })
     }
    };
    this.router.navigate(['my-immo/add-immo'], nav)
    // this.navCtrl.navigateForward('add-immo', prms);
    // console.log(prms);
  }

  ngOnInit(): void {
  }
}
