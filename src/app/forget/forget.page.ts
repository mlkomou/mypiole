import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {LoadingController, NavController, NavParams} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataUsersProvider} from "../providers/data-users/data-users";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  load = false;
  loader: any;
  retMsg: any = '';
  public forgetForm: FormGroup;
  constructor(public translate: TranslateService, public local: LocalStorageProvider, public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams, public dataUser: DataUsersProvider, public loadingCtrl: LoadingController) {
    this.forgetForm = this.formBuilder.group({
      username_email: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }

  login() {
    this.navCtrl.navigateForward('login');
  }

  forget(valForm) {
    this.retMsg = '';
    // console.log(valForm);
    this.loader =  this.loadingCtrl.create({
      // content: this.translate.instant('TXT.LOADING_CONN')
    });
    this.loader.present();
    let browserLang = this.translate.getBrowserLang();
    let val = {
      'username_email': this.forgetForm.value.username_email,
      'lang': browserLang.match(/en|fr|es|ar/) ? browserLang : 'en'
    };
    console.log(val);
    this.dataUser.forgetPass(val).subscribe(
      next => {
        console.log(next);
        if (next === null) {
          this.retMsg = this.translate.instant('TXT.INCORRECT_EMAIL');
        } else {
          if (next === true) {
            this.navCtrl.navigateRoot('login');
          } else {
            console.log("Noooooooo");
            this.retMsg = this.translate.instant('MSG.ERROR_SEND_MAIL');
          }
        }
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
  }

  ngOnInit(): void {
  }


}
