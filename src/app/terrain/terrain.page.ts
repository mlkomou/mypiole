import { Component, OnInit } from '@angular/core';
import {convertIntToPriceComat, terrains} from "../providers/functions-globales/functions-globales";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.page.html',
  styleUrls: ['./terrain.page.scss'],
})
export class TerrainPage {

  terrains: any;
  constructor(public local: LocalStorageProvider, public navCtrl: Router,) {
    this.terrains = terrains();
    this.terrains.forEach(i => {
      if (i.images.length === 0) i.images.push({
        'id': 0,
        'path': './assets/imgs/default-immo.jpg',
      });
      i['isFavorite'] = false;
      this.local.getFavorites().then((rep: any) => {
        if (rep !== null) {
          let favorites = JSON.parse(rep);
          if (favorites.length > 0) {
            favorites.forEach(f => {
              if (f.id === i.id && f.type === i.type) {
                i.isFavorite = true;
              }
            })
          }
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerrainPage');
  }

  goToDetail (id) {
    const prms: NavigationExtras = {
     queryParams: {
       'id': id
     }
    };
    this.navCtrl.navigate(['detail-terrain'],  prms);
    console.log(prms);
  }

  getPrice(p) {
    return convertIntToPriceComat(p);
  }

  addFavorite(favorite) {
    this.local.addFavorite(favorite).then((rep: any) => {
      console.log('Result: ' + rep);
    });
  }

  rmFavorite(favorite) {
    this.local.rmFavorite(favorite).then((rep: any) => {
      console.log('Result: ' + rep);
    });
  }

}

