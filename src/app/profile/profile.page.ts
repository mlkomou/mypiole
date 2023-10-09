import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {AlertController, NavController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  isConnect = false;
  user: any;
  constructor(public translate: TranslateService, public local: LocalStorageProvider, public alertCtrl: AlertController, public navCtrl: Router) {
    this.checkUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    this.checkUser();
  }

  async goto(p) {
    console.log(p);
    if (p === 'MyImmoPage') {
      if (this.isConnect) this.navCtrl.navigate([p]);
      else {
        const alert = await this.alertCtrl.create({
          header: 'MyPiole!',
          subHeader: this.translate.instant("NO_CONNECT"),
          buttons: ['OK']
        });
        await alert.present();
      }
    } else this.navCtrl.navigate([p]);
  }

  signin() {
    this.navCtrl.navigate(['login']);
  }

  signup() {
    this.navCtrl.navigate(['signup']);
  }

  logout() {
    const user = {
      'user_id': this.user.id,
      'username': this.user.username,
      'nom': this.user.nom,
      'prenom': this.user.prenom,
      'pays': this.user.pays,
      'ville': this.user.ville,
      'phone': this.user.phone,
      'profession': this.user.profession,
      'sex': this.user.sex,
      'password': this.user.password,
      'email': this.user.email,
      'avatar': this.user.avatar,
      'connect': false,
    };
    this.local.addUser(user).then((rep: any) => {
      // console.log('Result: ' + rep);
    });
    this.navCtrl.navigate(['profile']);
  }

  checkUser() {
    this.local.getUser().then((u: any) => {
      // console.log('User:  ' + u);
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
}
