import {Component, OnInit, ViewChild} from '@angular/core';
import {SocialSharing} from "@awesome-cordova-plugins/social-sharing/ngx";

import {IonContent, LoadingController, NavController, NavParams, ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {DataImtesProvider} from "../providers/data-imtes/data-imtes";
import {DataSocialProvider} from "../providers/data-social/data-social";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {convertIntToPriceComat, formatterTimeStampToString} from "../providers/functions-globales/functions-globales";

@Component({
  selector: 'app-detail-immo',
  templateUrl: './detail-immo.page.html',
  styleUrls: ['./detail-immo.page.scss'],
})
export class DetailImmoPage implements OnInit {

  page = 1;
  imtes: any = '';
  msg: any;
  imte: any;
  mode: any;
  isConnect = false;
  user: any;
  //comments: Observable<any[]>;
  comments: any = [];
  @ViewChild('slide') slide: any;
  @ViewChild(IonContent) content: IonContent;
  loader: any;
  noConnect: any;

  constructor(private socialSharing: SocialSharing, public translate: TranslateService, public loadingCtrl: LoadingController, public database: AngularFireDatabase, public toastCtrl: ToastController, public dataImte: DataImtesProvider, public dataSocial: DataSocialProvider, public local: LocalStorageProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.imte = this.navParams.data;
    // console.log(this.imte);
    this.mode = this.imte.mode;
    this.imte.user.phone = 'tel:' + this.imte.user.phone;
    this.imte.user.email = 'mailto:' + this.imte.user.email;
    console.log(this.imte);
    this.checkUser();
    this.listComments(this.imte.id);
    this.noConnect = translate.instant("NO_CONNECT");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetailImmoPage');
  }

  slideChanged(e) {
    let currentIndex = this.slide.getActiveIndex();
    console.log('Current index is', currentIndex);
    if (e.direction == 4) {
      console.log('droite');
      //direction 2 = right to left swipe.
      if (this.page > 1) this.page -= 1;
    } else if (e.direction == 2) {
      console.log('gauche');
      if (this.page < 5) this.page += 1;
      //direction 2 = right to left swipe.
    }
  }

  getPrice(p) {
    return convertIntToPriceComat(p);
  }

  addFavorite(favorite) {
    console.log('Add Fav');
    console.log(favorite);
    this.local.addFavorite(favorite).then((rep: any) => {
      // console.log('Result: ' + rep);
      this.imte.isFavorite = true;
    });
  }

  rmFavorite(favorite) {
    console.log('Rm Fav');
    console.log(favorite);
    this.local.rmFavorite(favorite).then((rep: any) => {
      this.imte.isFavorite = false;
      // console.log('Result: ' + rep);
    });
  }

  checkUser() {
    this.local.getUser().then((u: any) => {
      // console.log('User:  ' + u);
      this.user = null;
      if (u != null) {
        const usr = JSON.parse(u);
        this.user = usr;
        if (usr.connect) {
          this.isConnect = true;
        } else {
          this.isConnect = false;
        }
      }
    });
  }

  async noAccess() {
    const toast = await this.toastCtrl.create({
      message: this.noConnect,
      duration: 3000
    });
    await toast.present();
  }

  goToMsg(element: string) {
    let yOffset = document.getElementById(element).offsetTop;
    // this.content.scrollTo(0, yOffset, 4000);
  }

  async eventCmt(event) {
    console.log(event);
    if (this.user !== null) {
      if (this.msg !== null && this.msg !== '') {
        const obj = {
          'id': this.imte.id,
          'username': this.user.username,
          'message': this.msg,
          'status': true,
          'tms': new Date().getTime()
        };
        console.log(obj);
        this.dataSocial.addComment(obj).subscribe(nxt => {
          console.log(nxt);
          // this.listComments(obj.id);
        }, error => {
          console.log(error);
        }, () => {
          console.log('Good');
          // this.listComments(obj.id);
        });
        this.msg = '';
      }
    } else {
      const toast = await this.toastCtrl.create({
        message: this.noConnect,
        duration: 3000
      });
      await toast.present();
    }
  }

  formatterTimeStampToString(c) {
    return formatterTimeStampToString(c);
  }

  listComments(id) {
    this.dataSocial.getMessageList(id).valueChanges().subscribe(r => {
      this.comments = r;
    });
  }

  since(d) {
    formatterTimeStampToString(d);
  }

  share() {
    console.log(this.imte);
    let subject = 'Partage via l\'application MyPiole - ' +
    'Bien: ' + this.imte.type === 'Meuble' ? 'Appartement Meublé' : this.imte.type + '[' + this.imte.titre + '] - ' +
      'Adresse: ' + this.imte.quartier.nom + '-' + this.imte.quartier.ville.nom + ' - ' +
      'Prix: ' + this.imte.prix + ' ' + this.imte.devise + ' - ' +
      'Description: ' + this.imte.description + ' - ' +
      'Agent: ' + this.imte.user.phone + ' - ' +
      '';
    const img = this.imte.images && this.imte.images.length > 0 ? this.imte.images[0].path : null
    console.log(subject);
    console.log(img);
    this.socialSharing.share(subject, 'Partage via l\'application MyPiole', img, 'https://play.google.com/store/apps/details?id=com.apps.mypiole').then(r => {
      console.log('hello');
      console.log(r);
      const toast = this.toastCtrl.create({
        message: 'Partage éffectué avec succès.',
        duration: 10000
      });
    }).catch(() => {
      // Error!
    });
  }

  deleteImte() {
    this.loader = this.loadingCtrl.create({
      // content: this.translate.instant('DELETING')
    });
    this.loader.present();
    console.log(this.user.user_id);
    console.log(this.imte.user.id);
    console.log(this.imte.id);

    this.dataImte.deleteImmo(this.imte.id).subscribe(
      async next => {
        console.log(next);
        let result = next;
        if (result) {
          const toast = await this.toastCtrl.create({
            message: this.translate.instant("GOOD_DEL"),
            duration: 3000
          });
          await toast.present();
          this.navCtrl.navigateBack('my-immo');
        } else {

          const toaster = await this.toastCtrl.create({
            message: this.translate.instant("DEL_ERROR"),
            duration: 3000
          });
          await toaster.present();
        }
      },
      async error => {
        const toast = await this.toastCtrl.create({
          message: this.translate.instant("DEL_ERROR"),
          duration: 3000
        });
        await toast.present();
        console.log(error);
        this.loader.dismiss();
      }, () => {
        this.loader.dismiss();
        console.log('Complete!');
      }
    );
  }

  ngOnInit(): void {
  }
}
