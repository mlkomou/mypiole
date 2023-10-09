import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Network} from "@awesome-cordova-plugins/network/ngx";
// import * as Events from "events";



/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export enum ConnectionStatusEnum {
  Online,
  Offline
}
@Injectable()
export class NetworkProvider {
  previousStatus;
  constructor(public http: HttpClient,
              public alertCtrl: AlertController,
              public network: Network,
              // public eventCtrl: Events
  ) {
    console.log('Hello NetworkProvider Provider');
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        // this.eventCtrl.emit('network:offline');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        // this.eventCtrl.emit('network:online');
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }

}
