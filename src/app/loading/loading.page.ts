import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {SwiperComponent} from "swiper/angular";
import Swiper from "swiper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  id = 0;
  public form: FormGroup;
  go = false;

  @ViewChild("slides") slides: SwiperComponent;
  constructor(public modalCtrl: ModalController,
              public local: LocalStorageProvider,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder, public navCtrl: Router) {
    // this.slide.lockSwipes(true);
    this.form = this.formBuilder.group({
      isChecked: [false]
    });
  }

  changeV() {
    console.log(this.go);
  }

  async next(num) {
    console.log(num);
    // this.slides.swiperRef.disable();
    this.slides.swiperRef.slideTo(num);
    // this.slides.swiperRef.enable();
    if (num === 4) {
      if (this.go) {
        this.local.isOldUser().then((rep: any) => {
          console.log('isNew: ' + rep);
        });
        this.navCtrl.navigate(['tabs']);
      } else {
        const alert = await this.alertCtrl.create({
          subHeader: 'Veuillez accepter les conditions générales d\'utilisations',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
    this.slides.swiperRef.enable()
    // console.log(this.slide.getActiveIndex());
  }

  loadCond() {
    // const modal = this.modalCtrl.create('SearchPage', { value: {modal: 'Loading'} });
    // modal.onDidDismiss(val => {
    //   console.log(val);
    // });
    // modal.present();
  }

  ngOnInit(): void {
  }

  getSlide(event: [swiper: Swiper]) {
    console.log(event);
  }
}
