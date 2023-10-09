import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {LoadingController, NavParams} from "@ionic/angular";
import {DataUsersProvider} from "../providers/data-users/data-users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  load = false;
  loader: any;
  retMsg: any = '';
  constructor(public translate: TranslateService,
              private router: Router,
              public local: LocalStorageProvider, private formBuilder: FormBuilder, public navParams: NavParams, public dataUser: DataUsersProvider, public loadingCtrl: LoadingController) {
    this.loginForm = this.formBuilder.group({
      username_email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup() {
    this.router.navigate(['signup']);
  }

  forget() {
    this.router.navigate(['forget']);
  }

  async login(valForm) {
    this.retMsg = '';
    console.log(valForm);
    this.loader = await this.loadingCtrl.create({
      // content: this.translate.instant('TXT.LOADING_CONN')
    });
    this.loader.present();
    this.dataUser.loginUser(valForm).subscribe(
      next => {
        console.log(next);
        if (next === null) {
          this.retMsg = this.translate.instant('TXT.INCORRECT_EMAIL');
        } else {
          const user = {
            'user_id': next.id,
            'username': next.username,
            'nom': next.nom,
            'prenom': next.prenom,
            'pays': next.pays,
            'ville': next.ville,
            'phone': next.phone,
            'profession': next.profession,
            'sex': next.sex,
            'password': this.loginForm.value.password,
            'email': next.email,
            'avatar': next.avatar,
            'connect': true,
          };
          this.local.addUser(user).then((rep: any) => {
            console.log('Result: ' + rep);
          });
          this.router.navigate(['profile']);
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
