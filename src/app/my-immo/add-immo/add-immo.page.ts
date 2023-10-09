import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AlertController, LoadingController, NavController, NavParams, ToastController} from "@ionic/angular";
import {Camera} from "@awesome-cordova-plugins/camera/ngx";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {DataUsersProvider} from "../../providers/data-users/data-users";
import {DataLocationsProvider} from "../../providers/data-locations/data-locations";
import { countries } from "../../providers/functions-globales/functions-globales";
import {ActivatedRoute, Router} from "@angular/router";
import {CameraOptions} from "@awesome-cordova-plugins/camera";


@Component({
  selector: 'app-add-immo',
  templateUrl: './add-immo.page.html',
  styleUrls: ['./add-immo.page.scss'],
})
export class AddImmoPage{

  public imteForm: FormGroup;
  public imteForm_2: FormGroup;
  types = [];
  types_2 = [];
  tags = [];
  countries = [];
  itemsV = [];
  itemsQ = [];
  medias = [];
  tag = '';
  errorAdd = '';
  isImmo = true;
  show = true;
  show_1 = false;
  show_2 = false;
  show_p = false;
  is_meuble = false;
  qterExist = false;
  prop = false;
  terr = false;
  immo = false;
  step_1 = true;
  user: any;
  load = false;
  loader: any;
  mode: any;
  type: any = '';
  villes: any = [];
  quartiers: any = [];
  quartier_id: any = 0;

  currentMain = true;
  currentMedia = null;
  indice = 0;
  textLoc: any = 'Location';
  showLocat = true;
  plh_type: any = '';
  plh_name: any = '';
  plh_price_month: any = '';
  plh_price_day_min: any = '';
  plh_price_day_max: any = '';
  plh_price_month_min: any = '';
  plh_price_month_max: any = '';
  plh_price_hour_min: any = '';
  plh_price_hour_max: any = '';
  plh_commission: any = '';
  plh_room: any = '';
  plh_debroom: any = '';
  plh_surface: any = '';
  plh_price: any = '';
  plh_m_min: any = '';
  plh_m_max: any = '';
  plh_m: any = '';
  plh_country: any = '';
  plh_city: any = '';
  plh_quater: any = '';
  plh_tag: any = '';
  plh_desc: any = '';
  bedroom: any = '';
  studio: any = '';
  apartment: any = '';
  house: any = '';
  coloc: any = '';
  office: any = '';
  magasin: any = '';
  land: any = '';
  space: any = '';
  hotel: any = '';
  meuble: any = '';
  salle: any = '';
  boutique: any = '';
  commerce: any = '';
  recording: any = '';
  error_save: any = '';
  textLocat: any = '';
  textBuy: any = '';
  textSell: any = '';
  devices: any = [];
  imagesRequired: any = [];

  constructor(public translate: TranslateService, public toastCtrl: ToastController,
              private route: ActivatedRoute,
              private camera: Camera, public local: LocalStorageProvider, public alertCtrl: AlertController,
              private formBuilder: FormBuilder, public navCtrl: Router, public dataUser: DataUsersProvider, public dataLocation: DataLocationsProvider,
              public loadingCtrl: LoadingController) {
    this.plh_type = translate.instant('PLH.TYPE');
    translate.get('PLH.TYPE').subscribe(value => { this.plh_type = value + '**'; });
    translate.get('PLH.NAME').subscribe(value => { this.plh_name = value + '*'; });
    translate.get('PLH.PRICE_MONTH_MAX').subscribe(value => { this.plh_price_month_max = value + '**'; });
    translate.get('PLH.PRICE_MONTH_MIN').subscribe(value => { this.plh_price_month_min = value + '**'; });
    translate.get('PLH.PRICE_MONTH').subscribe(value => { this.plh_price_month = value + '**'; });
    translate.get('PLH.PRICE_DAY_MIN').subscribe(value => { this.plh_price_day_min = value + '**'; });
    translate.get('PLH.PRICE_DAY_MAX').subscribe(value => { this.plh_price_day_max = value + '**'; });
    translate.get('PLH.PRICE_HOUR_MIN').subscribe(value => { this.plh_price_hour_min = value + '**'; });
    translate.get('PLH.PRICE_HOUR_MAX').subscribe(value => { this.plh_price_hour_max = value + '**'; });
    translate.get('PLH.COMMISSION').subscribe(value => { this.plh_commission = value + '*'; });
    translate.get('PLH.ROOM').subscribe(value => { this.plh_room = value + '*'; });
    translate.get('PLH.BEDROOM').subscribe(value => { this.plh_debroom = value + '*'; });
    translate.get('PLH.SURFACE').subscribe(value => { this.plh_surface = value + '**'; });
    translate.get('PLH.PRICE').subscribe(value => { this.plh_price = value; });
    translate.get('PLH.PRICE_M2').subscribe(value => { this.plh_m = value + '**'; });
    translate.get('PLH.COUNTRY').subscribe(value => { this.plh_country = value + '*'; });
    translate.get('PLH.DESC').subscribe(value => { this.plh_desc = value + '*'; });
    translate.get('PLH.CITY').subscribe(value => { this.plh_city = value + '**'; });
    translate.get('PLH.QUATER').subscribe(value => { this.plh_quater = value + '**'; });
    translate.get('PLH.TAG').subscribe(value => { this.plh_tag = value; });
    translate.get('TYPE.BEDROOM').subscribe(value => { this.bedroom = value; });
    translate.get('TYPE.STUDIO').subscribe(value => { this.studio = value; });
    translate.get('TYPE.APARTMENT').subscribe(value => { this.apartment = value; });
    translate.get('TYPE.HOUSE').subscribe(value => { this.house = value; });
    translate.get('TYPE.COLOC').subscribe(value => { this.coloc = value; });
    translate.get('TYPE.OFFICE').subscribe(value => { this.office = value; });
    translate.get('TYPE.STORE').subscribe(value => { this.magasin = value; });
    translate.get('TYPE.TERRAIN').subscribe(value => { this.land = value; });
    translate.get('TYPE.ESPACE').subscribe(value => { this.space = value; });
    translate.get('TYPE.HOTEL').subscribe(value => { this.hotel = value; });
    translate.get('TYPE.MEUBLE').subscribe(value => { this.meuble = value; });
    translate.get('TYPE.SALLE').subscribe(value => { this.salle = value; });
    translate.get('TYPE.BOUTIQUE').subscribe(value => { this.boutique = value; });
    translate.get('TYPE.COMMERCE').subscribe(value => { this.commerce = value; });
    translate.get('SAVING').subscribe(value => { this.recording = value; });
    translate.get('MSG.ERROR_SAVE').subscribe(value => { this.error_save = value; });
    translate.get('LOCAT').subscribe(value => { this.textLocat = value; });
    translate.get('BUY').subscribe(value => { this.textBuy = value; });
    translate.get('SELL').subscribe(value => { this.textSell = value; });
    this.types = [
      { 'value': 'Chambre', 'item': this.bedroom },
      { 'value': 'Studio', 'item': this.studio },
      { 'value': 'Appartement', 'item': this.apartment },
      { 'value': 'Maison', 'item': this.house },
      { 'value': 'Co-Location', 'item': this.coloc },
      { 'value': 'Bureau | Commerce', 'item': this.office },
      { 'value': 'Entrepot | Magasin', 'item': this.magasin },
      { 'value': 'Terrain', 'item': this.land },
      { 'value': 'Espace Libre', 'item': this.space },
      { 'value': 'Hotel', 'item': this.hotel },
      { 'value': 'Meuble', 'item': this.meuble },
      { 'value': 'Boutique', 'item': this.boutique },
      { 'value': 'Fond De Commerce', 'item': this.commerce },
      { 'value': 'Salle', 'item': this.salle }
    ];
    console.log(this.types);
    this.devices = [
      { 'device': 'XAF' },
      { 'device': '€' },
      { 'device': '$' }
    ];
    this.types_2 = [
      { 'value': 'Chambre', 'item': 'Chambre' },
      { 'value': 'Studio', 'item': 'Studio' },
      { 'value': 'Appartement', 'item': 'Appartement' },
      { 'value': 'Maison', 'item': 'Maison' },
      { 'value': 'Co-Location', 'item': 'Co-Location' },
      { 'value': 'Bureau', 'item': 'Bureau' },
      { 'value': 'Parking', 'item': 'Parking' },
      { 'value': 'Espace Libre', 'item': 'Espace Libre' },
      { 'value': 'Terrain', 'item': 'Terrain' },
      { 'value': 'SALLE', 'item': this.salle }
    ];

    this.route.queryParams.subscribe((query: any) => {
      if (query) {
        let data: { type: any, mode: any } = JSON.parse(query.data);
        this.type = data.type;
        const mod = data.mode;
        console.log('typeFromImmo', this.type);

        if (this.type !== null && this.type !== undefined) {
          this.is_meuble = false;

          if (this.type === 'Co-Location') {
            this.show = false;
            this.show_1 = true;
            this.showLocat = false;
            this.prop = false;
            this.isImmo = true;
            this.imteForm.patchValue({ 'type': this.type });
            this.imteForm.patchValue({ 'titre': this.type });
            this.imteForm.patchValue({ 'surface': '0' });
            this.imteForm.patchValue({ 'prixMax': '0' });
            this.imteForm.patchValue({ 'surfaceMax': '0' });
            console.log(this.imteForm.value);
          }
          else if (this.type === 'Terrain') {
            this.showLocat = true;
            this.prop = false;
            this.isImmo = false;
            this.types = [
              { 'value': 'Terrain', 'item': this.land },
              { 'value': 'Espace Libre', 'item': this.space }
            ];
            this.mode = 'Terrain';
            this.imteForm.patchValue({ 'pieces': 0 });
            this.imteForm.patchValue({ 'chambre': 0 });
            this.imteForm.patchValue({ 'surface': '' });
            this.imteForm.patchValue({ 'surfaceMax': '0' });
            this.imteForm.patchValue({ 'prixMax': '0' });
          }
          else if (this.type === 'Hotel') {
            this.mode = 'Hotel';
            // this.show = false;
            this.showLocat = false;
            this.show_2 = true;
            this.imteForm.patchValue({ 'type': this.type });
            this.imteForm.patchValue({ 'titre': this.type });
            this.imteForm.patchValue({ 'prixMax': '' });
            this.imteForm.patchValue({ 'pieces': '0' });
            this.imteForm.patchValue({ 'chambre': '0' });
            this.imteForm.patchValue({ 'commission': '0' });
            this.imteForm.patchValue({ 'surface': '0' });
          } else if (this.type === 'Meuble') {
            this.mode = 'Meuble';
            this.showLocat = false;
            this.show_2 = true;
            this.is_meuble = true;
            console.log('gooood');
            this.imteForm.patchValue({ 'type': this.type });
            this.imteForm.patchValue({ 'titre': this.type });
            this.imteForm.patchValue({ 'prixMax': '' });
            this.imteForm.patchValue({ 'surfaceMax': '' });
            this.imteForm.patchValue({ 'pieces': '0' });
            this.imteForm.patchValue({ 'chambre': '0' });
            this.imteForm.patchValue({ 'commission': '0' });
            this.imteForm.patchValue({ 'surface': '' });
          } else if (this.type === 'Proposition') {
            this.prop = true;
            this.imteForm.patchValue({ 'prixMax': '' });
            if (!this.isImmo) this.imteForm.patchValue({ 'surfaceMax': '' });
            this.imteForm.patchValue({ 'pieces': '0' });
            this.imteForm.patchValue({ 'chambre': '0' });
            this.imteForm.patchValue({ 'commission': '0' });
          }
        }
      }
    })

    console.log(this.type);

    this.imteForm = this.formBuilder.group({
      isLoc: [true, Validators.required],
      type: ['', Validators.required],
      device: ['XAF', Validators.required],
      titre: ['', Validators.required],
      prix: ['', Validators.required],
      prixMax: ['', Validators.required],
      commission: ['', Validators.required],
      pieces: ['', Validators.required],
      chambre: ['', Validators.required],
      surface: ['', Validators.required],
      surfaceMax: ['', Validators.required],
    });
    this.imteForm_2 = this.formBuilder.group({
      pays: ['Cameroon', Validators.required],
      ville: ['', Validators.required],
      quartier: ['', Validators.required],
      tags: [''],
      description: ['', Validators.required],
    });
    this.imteForm.patchValue({ 'prixMax': '0' });
    this.imteForm.patchValue({ 'surfaceMax': '0' });

    this.countries = countries();
    this.checkUser();
    this.loadVilles(this.imteForm_2.value.pays);
    // this.loadQuartier(1);

    this.textLoc = this.textLocat;
    this.translate.get('PLH.PRICE_MONTH').subscribe(value => { this.plh_price_month = value + '**'; });
    this.imteForm.patchValue({ 'isLoc': true });
  }

  async ionViewDidLoad() {
    this.checkUser();
    console.log('ionViewDidLoad AddImmoPage');
    let loader = await this.loadingCtrl.create({
      message: this.translate.instant('COMM_BAS'),
      duration: 2000
    });
    await loader.present();
  }

  step1(val) {
    console.log(val);
    console.log(this.imteForm.valid);
    console.log(this.imteForm);
    // if (this.imteForm.valid)
      this.step_1 = false;
  }

  register(val) {
    console.log('going to save');
    this.imagesRequired = '';
    if (this.medias.length === 0 && !this.prop) {
      this.translate.get('IMG_REQ').subscribe(value => { this.imagesRequired = value; });
    } else {
      let id_quartier = this.qterExist ? this.quartier_id : val.quartier;
      this.errorAdd = '';
      const imte = {
        'location': this.imteForm.value.isLoc,
        'chambre': this.imteForm.value.chambre,
        'commission': this.imteForm.value.commission,
        'pieces': this.imteForm.value.pieces,
        'prix': (this.show_2 || this.prop) ? this.imteForm.value.prix + ' | ' + this.imteForm.value.prixMax : this.imteForm.value.prix,
        'surface': ((this.prop && !this.isImmo) || (this.show_2 || this.is_meuble)) ? this.imteForm.value.surface + ' | ' + this.imteForm.value.surfaceMax : this.imteForm.value.surface,
        'titre': this.imteForm.value.titre,
        'type': this.imteForm.value.type,
        'description': val.description,
        'lattitude': 0,
        'longitude': 0,
        'pays': val.pays,
        'quartier': id_quartier,
        'tags': this.tags,
        'mode': this.mode,
        'proposition': this.prop,
        'qterExist': this.qterExist,
        'ville': val.ville,
        'avatar': '',
        'devise': this.imteForm.value.device,
        'images': this.medias,
        'user_id': this.user.user_id
      };
      console.log(imte);
      this.loader = this.loadingCtrl.create({
        message: this.recording
      });
      this.loader.present();
      this.dataUser.addImmo(imte).subscribe(
        async next => {
          console.log(next);
          if (next.type != undefined && next.type !== null) {
            const toast = await this.toastCtrl.create({
              message: this.translate.instant("GOOD_SAVE"),
              duration: 5000
            });
            await toast.present();
            this.navCtrl.navigate(['my-immo']);
          } else {
            this.errorAdd = this.error_save;
          }
        },
        error => {
          this.errorAdd = this.error_save;
          console.log(error);
          this.load = true;
          this.loader.dismiss();
        }, () => {
          this.load = true;
          this.loader.dismiss();
          console.log('Complete!');
        }
      );
      this.step_1 = true;
    }
  }

  valType() {
    this.imteForm.patchValue({ 'isLoc': true });
    const typ = this.imteForm.value.type;
    this.immo = true;
    console.log(typ);
    console.log(this.immo);
    console.log(this.prop);
    console.log(this.isImmo);
    this.imteForm.patchValue({ 'titre': this.translator(typ) });
    this.is_meuble = false;
    if (typ === 'Terrain' || typ === 'Espace Libre') {
      this.mode = 'Terrain';
      this.isImmo = false;
      this.imteForm.patchValue({ 'pieces': 0 });
      this.imteForm.patchValue({ 'chambre': 0 });
      this.imteForm.patchValue({ 'surface': '' });
      this.imteForm.patchValue({ 'surfaceMax': '0' });
      this.textLoc = this.textSell;
      this.translate.get('PLH.PRICE_SELL').subscribe(value => { this.plh_price_month = value + '**'; });
      this.imteForm.patchValue({ 'isLoc': false });
    } else if (typ === 'Hotel') {
      this.mode = 'Hotel';
      this.show = false;
      this.showLocat = false;
      this.show_2 = true;
      this.imteForm.patchValue({ 'prixMax': '' });
      this.imteForm.patchValue({ 'pieces': '0' });
      this.imteForm.patchValue({ 'chambre': '0' });
      this.imteForm.patchValue({ 'commission': '0' });
      this.imteForm.patchValue({ 'surface': '0' });
    } else if (typ === 'Meuble') {
      this.mode = 'Meuble';
      this.show = false;
      this.showLocat = false;
      this.show_2 = true;
      this.is_meuble = true;
      this.imteForm.patchValue({ 'prixMax': '' });
      this.imteForm.patchValue({ 'pieces': '0' });
      this.imteForm.patchValue({ 'chambre': '0' });
      this.imteForm.patchValue({ 'commission': '0' });
      this.imteForm.patchValue({ 'surface': '0' });
    } else {
      this.mode = 'Immo';
      this.isImmo = true;
      this.show_1 = true;
      if (typ === 'Chambre' || typ === 'Bureau | Commerce' || typ === 'Parking' || typ === 'Entrepot | Magasin' || typ === 'Salle') {
        this.show_p = false;
        this.imteForm.patchValue({ 'pieces': 0 });
        this.imteForm.patchValue({ 'chambre': 0 });
        this.imteForm.patchValue({ 'surface': 0 });
      } else if (typ === 'Boutique' || typ === 'Fond De Commerce') {
        this.show_p = false;
        this.imteForm.patchValue({ 'pieces': 0 });
        this.imteForm.patchValue({ 'chambre': 0 });
        this.imteForm.patchValue({ 'surface': 0 });
        this.textLoc = this.textSell;
        this.translate.get('PLH.PRICE_SELL').subscribe(value => { this.plh_price_month = value + '**'; });
        this.imteForm.patchValue({ 'isLoc': false });
      } else {
        this.imteForm.patchValue({ 'pieces': '' });
        this.imteForm.patchValue({ 'chambre': '' });
        this.imteForm.patchValue({ 'surface': 0 });
        this.show_p = true;
      }
    }
    console.log(this.imteForm.value)

  }

  changePays() {
    this.qterExist = false;
    this.loadVilles(this.imteForm_2.value.pays);
  }

  async alertMsg(val) {
    console.log(val);
    let msg = '';
    if (val === 'Prix/Mois')
      msg = this.translate.instant("TIPS.PMO");
    else if (val === 'Prix/M2')
      msg = this.translate.instant("TIPS.PM2");
    else if (val === 'Commission')
      msg = this.translate.instant("TIPS.COM");
    else if (val === 'Surface')
      msg = this.translate.instant("TIPS.SURF");
    else if (val === 'Descritpion')
      msg = this.translate.instant("TIPS.DESC");
    else if (val === 'Tags')
      msg = this.translate.instant("TIPS.TAG");
    const alert = await this.alertCtrl.create({
      header: this.translate.instant("TIPS.TIP"),
      subHeader: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  removeElt(i) {
    this.tags.splice(i, 1);
    this.imteForm_2.patchValue({ 'tags': this.tags });
    this.tag = '';
  }

  onKeyTags(event) {
    console.log('keyup');
    let inputValue = event.target.value !== undefined ? event.target.value.trim() : '';
    let add = true;
    if (inputValue.length > 3) {
      if (event.key === "Enter") {
        this.tags.forEach(s => {
          if (s === inputValue) add = false;
        });
        if (add && this.tags.length < 3) this.tags.push(inputValue);
        this.imteForm_2.patchValue({ 'tags': this.tags });
        this.tag = '';
        console.log(inputValue);
      } else if (event.keyCode == 32) {
        this.tags.forEach(s => {
          if (s === inputValue) add = false;
        });
        if (add && this.tags.length < 3) this.tags.push(inputValue);
        this.imteForm_2.patchValue({ 'tags': this.tags });
        this.tag = '';
        console.log(inputValue);
      }
    }
  }

  back() {
    this.step_1 = true;
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

  loadVilles(nom) {
    this.dataLocation.getVillesPays(nom).subscribe(
      next => {
        console.log(next);
        this.villes = next;
      },
      error => {
        this.villes = [];
        console.log(error);
      }
    );
  }

  loadQuartier() {
    const pays = this.imteForm_2.value.pays;
    const ville = this.imteForm_2.value.ville;
    this.dataLocation.getQuartierVille(pays, ville).subscribe(
      next => {
        console.log(next);
        this.quartiers = next;
      },
      error => {
        this.quartiers = [];
        console.log(error);
      }
    );
  }

  getItems(ev: any) {
    // this.loadVilles(this.imteForm_2.value.pays);
    this.itemsV = this.villes;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.itemsV = this.itemsV.filter((item) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getItemsQ(ev: any) {
    // this.loadVilles(this.imteForm_2.value.pays);
    this.itemsQ = this.quartiers;
    this.qterExist = false;
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.itemsQ = this.itemsQ.filter((item) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getVille(id, nom) {
    console.log(nom);
    this.imteForm_2.patchValue({ 'ville': nom });
    this.itemsV = [];
  }

  getQuartier(id, nom) {
    console.log(nom);
    this.imteForm_2.patchValue({ 'quartier': nom });
    this.quartier_id = id;
    this.qterExist = true;
    this.itemsQ = [];
  }

  getCurrentPosition() {
    console.log('Get position');
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log(resp);
    //   this.imteForm_2.patchValue({'lattitude': resp.coords.latitude});
    //   this.imteForm_2.patchValue({'longitude': resp.coords.longitude});
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

  setCurrentMedia(m, i) {
    this.currentMedia = m;
    this.indice = i;
    console.log(this.currentMedia);
    // this.onToggleChange(null)
  }

  deleteMedia() {
    this.medias.splice(this.indice, 1);
  }

  getPictureFromPhotoLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: 0,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    };
    this.camera.getPicture(options).then(async (ImageData) => {
      let base64Image = ImageData;
      if (this.medias.length < 5)
        this.medias.push('data:image/jpeg;base64,' + ImageData);
      else {
        const alert = await this.alertCtrl.create({
          header: 'MyPiole!',
          subHeader: this.translate.instant("TIPS.QUOTA"),
          buttons: ['OK']
        });
        await alert.present();
      }
    }, error => {
      console.log(error)
    });
  }

  getPictureFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: 0,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1
    };
    this.camera.getPicture(options).then(async (ImageData) => {
      let base64Image = ImageData;
      if (this.medias.length < 5)
        this.medias.push('data:image/jpeg;base64,' + ImageData);
      else {
        const alert = await this.alertCtrl.create({
          header: 'MyPiole!',
          subHeader: this.translate.instant("TIPS.QUOTA"),
          buttons: ['OK']
        });
        await alert.present();
      }
    }, error => {
      console.log(error)
    });
  }

  isLocat() {
    const isLoc = this.imteForm.value.isLoc;
    console.log(isLoc);
    if (isLoc) {
      this.textLoc = this.textLocat;
      this.translate.get('PLH.PRICE_MONTH').subscribe(value => { this.plh_price_month = value + '**'; });
    }
    else {
      this.textLoc = this.textSell;
      this.translate.get('PLH.PRICE_SELL').subscribe(value => { this.plh_price_month = value + '**'; });
    }
  }

  translator(val) {
    let browserLang = this.translate.getBrowserLang();
    let lang = browserLang.match(/en|fr|es|ar/) ? browserLang : 'en';
    let value = ''
    if (lang !== 'fr') {
      if (val == 'Maison') value = this.translate.instant('HOUSE');
      else if (val == 'Chambre') value = this.translate.instant('BEDROOM');
      else if (val == 'Studio') value = this.translate.instant('STUDIO');
      else if (val == 'Appartement') value = this.translate.instant('APARTMENT');
      else if (val == 'Entrepot | Magasin') value = this.translate.instant('STORE');
      else if (val == 'Salle') value = this.translate.instant('SALLE');
      else if (val == 'Co-Location') value = this.translate.instant('COLOC');
      else if (val == 'Bureau | Commerce') value = this.translate.instant('OFFICE');
      else if (val == 'Espace Libre') value = this.translate.instant('SPACE_RENTAL');
      else if (val == 'Terrain') value = this.translate.instant('LAND_SALE');
      else if (val == 'Autres') value = this.translate.instant('OTHER');
      return value;
    } else {
      return val;
    }
  }
}
