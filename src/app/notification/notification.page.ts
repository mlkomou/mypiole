import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {DataLocationsProvider} from "../providers/data-locations/data-locations";
import {TranslateService} from "@ngx-translate/core";
import {formatterTimeStampToString} from "../providers/functions-globales/functions-globales";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  notifs = [];
  constructor(public viewCtrl: ModalController, public local: LocalStorageProvider,
              public dataLocation: DataLocationsProvider, public toastCtrl: ToastController, public translate: TranslateService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  getNotifs() {
    this.dataLocation.getNotif().subscribe(
      next => {
        this.notifs = next;
        console.log(next);
      },
      async error => {
        console.log(error);
        const toast = await this.toastCtrl.create({
          message: this.translate.instant("BAD_NETWORK"),
          duration: 3000
        });
        this.notifs = [];
        await toast.present();
      }, () => {

      });
  }

  ngOnInit(): void {
    this.getNotifs();
  }

  since(dt) {
    let d = new Date(dt).getTime();
    return formatterTimeStampToString(d);
  }
}

