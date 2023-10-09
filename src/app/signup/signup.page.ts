import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AlertController, LoadingController} from "@ionic/angular";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {Router} from "@angular/router";
import {DataUsersProvider} from "../providers/data-users/data-users";
import {countries} from "../providers/functions-globales/functions-globales";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  public signupForm: FormGroup;
  match = false;
  match_in = false;
  load = false;
  badEmail = false;
  badPhone = false;
  loader: any;
  retMsg: any = '';
  existUser: any = '';
  existPhone: any = '';
  existEmail: any = '';
  noEmailValid: any = '';
  user: any = null;
  isUser: any = false;
  displ1: any = true;
  displ2: any = false;
  countries = [];
  typeInput = 'password';
  notCode = '';
  code = 0;
  constructor(public translate: TranslateService, public alertCtrl: AlertController, public local: LocalStorageProvider, public navCtrl: Router, private formBuilder: FormBuilder,
              public dataUser: DataUsersProvider, public loadingCtrl: LoadingController) {
    this.countries = countries();
    this.checkUser();
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      sex: ['', Validators.required],
      nom: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [''],
      adress: [false, Validators.required],
      user_id: [0],
      code: [],
      pays: ['Cameroon', Validators.required]
    });
    console.log(this.user);
    this.local.getUser().then((u: any) => {
      // console.log('User:  ' + u);
      if (u != null) {
        const usr = JSON.parse(u);
        this.user = usr;
        console.log(usr);
        if (this.user !== null) {
          if (this.user.connect) {
            this.isUser = true;
            this.signupForm = this.formBuilder.group({
              username: [this.user.username, Validators.required],
              sex: [this.user.sex, Validators.required],
              nom: [this.user.nom, Validators.required],
              phone: [this.user.phone, Validators.required],
              email: [this.user.email, Validators.required],
              password: [this.user.password, Validators.required],
              avatar: [''],
              adress: [this.user.adress === 'Agent', Validators.required],
              user_id: [this.user.user_id],
              pays: [this.user.pays, Validators.required]
            });
          }
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(valForm) {
    this.notCode = '';
    if (!this.isUser) {
      console.log(valForm.code);
      console.log(this.code);
      if (valForm.code !== this.code+'') {
        this.notCode = this.translate.instant('TXT.NOT_VALID_CODE');
        return;
      }
    }
    this.retMsg = '';
    this.existUser = '';
    this.existPhone = '';
    this.existEmail = '';
    valForm.adress = valForm.adress ? 'Agent' : 'Client';
    console.log(valForm);
    this.loader =  this.loadingCtrl.create({
      message: this.translate.instant('TXT.LOADING_INSCRP')
    });
    this.loader.present();
    this.dataUser.addUser(valForm).subscribe(
      async next => {
        console.log(next);
        console.log(next.enabled);
        if (next.enabled != undefined && next.enabled != null) {
          console.log('isUndefined');
          this.displ1 = true;
          this.displ2 = false;
          if (!next.status) {
            this.existUser = next.username.length > 1 ? this.translate.instant('EXIST_USER') : '';
            this.existPhone = next.phone.length > 1 ? this.translate.instant('EXIST_PHONE') : '';
            this.existEmail = next.email.length > 1 ? this.translate.instant('EXIST_EMAIL') : '';
          } else {
            const user = {
              'user_id': next.id,
              'username': next.username,
              'nom': next.nom,
              'pays': next.pays,
              'phone': next.phone,
              'email': next.email,
              'sex': next.sex,
              'password': this.signupForm.value.password,
              'avatar': next.avatar,
              'adress': next.adress ? 'Agent' : 'Client',
              'connect': true,
            };
            this.local.addUser(user).then((rep: any) => {
              console.log('Result: ' + rep);
            });
            if (this.isUser) {
              const alert = await this.alertCtrl.create({
                header: 'MyPiole!',
                subHeader: this.translate.instant('TXT_CORRECT_UPDATE'),
                buttons: ['OK']
              });
              await alert.present();
            } else {
              const alert = await this.alertCtrl.create({
                header: 'MyPiole!',
                subHeader: this.translate.instant('TXT.CORRECT_INSCRP'),
                buttons: ['OK']
              });
              await alert.present();
            }
            this.navCtrl.navigate(['profile']);
          }
        } else {
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

  onKeyPass(event) {
    const inputValue = event.target.value;
    const rpassword = this.signupForm.value.rpassword;
    if(inputValue !== '' && rpassword !== '') {
      if(inputValue === rpassword) {
        this.match = true;
        this.match_in = false;
      }
      else {
        this.match = false;
        this.match_in = true;
      }
    }
  }

  onKeyPassBis(event) {
    const inputValue = event.target.value;
    const password = this.signupForm.value.password;
    if(inputValue !== '' && password !== '') {
      if(inputValue === password) {
        this.match = true;
        this.match_in = false;
      }
      else {
        this.match = false;
        this.match_in = true;
      }
    }
  }

  showHidePass() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }

  onKeyEmail(event) {
    let inputValue = event.target.value;
    this.badEmail = false;
    let isValidEmail = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/.test(inputValue);
    if (!isValidEmail) {
      if (inputValue !== '') {
        this.badEmail = true;
      }
    }
  }

  onKeyPhone(event) {
    let inputValue = event.target.value;
    this.badPhone = false;
    if (inputValue.length > 0) {
      if (this.signupForm.value.pays === 'Cameroon' && inputValue.length === 9) {
        this.badPhone = false;
      } else if (this.signupForm.value.pays === 'Cameroon' && inputValue.length !== 9) {
        this.badPhone = true;
      } else if (this.signupForm.value.pays !== 'Cameroon' && inputValue.length < 7) {
        this.badPhone = true;
      } else if (this.signupForm.value.pays !== 'Cameroon' && inputValue.length >= 7) {
        this.badPhone = false;
      }
    }
  }

  checkUser() {
    this.local.getUser().then((u: any) => {
      // console.log('User:  ' + u);
      if (u != null) {
        const usr = JSON.parse(u);
        this.user = usr;
      }
    });
  }

  validEmail() {
    this.noEmailValid = '';
    this.retMsg = '';
    this.existUser = '';
    this.existPhone = '';
    this.existEmail = '';
    this.loader =  this.loadingCtrl.create({
      message: 'Email Valiadtion'
    });
    this.loader.present();
    console.log('hello');
    let min = 1000;
    let max = 9999;
    this.code = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(this.code);

    let browserLang = this.translate.getBrowserLang();
    this.dataUser.sendCode({'code': this.code, 'lang': browserLang.match(/en|fr|es|ar/) ? browserLang : 'en', 'email': this.signupForm.value.email}).subscribe(
      next => {
        console.log(next);
        this.displ1 = false;
        this.displ2 = true;
      },
      error => {
        console.log(error);
        this.noEmailValid = 'Verifiez votre email, le mail n\'a pas été envoyé.';
        this.loader.dismiss();
      }, () => {
        this.loader.dismiss();
        console.log('Complete!');
      }
    );
  }

  precc() {
    console.log('hello');
    this.displ1 = true;
    this.displ2 = false;
  }

}

