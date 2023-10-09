import { Component, OnInit } from '@angular/core';
import {convertIntToPriceComat} from "../providers/functions-globales/functions-globales";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-favory',
  templateUrl: './favory.page.html',
  styleUrls: ['./favory.page.scss'],
})
export class FavoryPage implements OnInit {

  immos: any = [];

  constructor(public local: LocalStorageProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.local.getFavorites().then((rep: any) => {
      if (rep !== null) {
        this.immos = JSON.parse(rep);
        console.log(this.immos);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoryPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FavoryPage');
    this.local.getFavorites().then((rep: any) => {
      if (rep !== null) {
        this.immos = JSON.parse(rep);
        this.immos.forEach(i => {
          i['isFavorite'] = true;
          i['mode'] = 'Immo';
          console.log(i);
        });
        console.log(this.immos);
      }
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FavoryPage');
  }

  ionViewWillUnload() {
    console.log('ionViewDidLoad FavoryPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave FavoryPage');
  }

  ionViewCanLeave() {
    console.log('ionViewWillLeave FavoryPage');
  }

  ionViewCanEnter() {
    console.log('ionViewWillLeave FavoryPage');
  }


  goToDetail(imte) {
    this.navCtrl.navigateForward('detail-immo', imte);
  }

  getPrice(p) {
    return convertIntToPriceComat(p);
  }

  ngOnInit(): void {
  }
}
