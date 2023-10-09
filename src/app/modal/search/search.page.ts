import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  date: any;
  prix: any;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  vle_dep: string;
  vle_arr: string;
  searchQuery: string = '';
  searchCrt: string = '';
  // value: string = '';
  items: any;
  itemsV: any;
  user: any;
  selectQters: Array<any> = [];
  selectVilles: Array<any> = [];
  selectCriteria: Array<any> = [];
  selectCriteriaV: Array<any> = [];
  apparts: Array<any> = [];
  appart: any = false;
  maisons: Array<any> = [];
  maison: any = false;
  chambre: any = false;
  studio: any = false;
  colocation: any = false;
  commerce: any = false;
  store: any = false;
  parking: any = false;
  space: any = false;
  salle: any = false;
  boutique: any = false;
  fondCommerce: any = false;
  terrain: any = false;
  autre: any = false;
  checkedApparts: any;
  checkedMaisons: any;
  checkeds: any = [];
  quartiers: any = [];
  villes: any = [];
  prixI: any;
  prixS: any;
  surfI: any;
  surfS: any;
  // mode: any;
  device: any;
  count: any = 0;
  devices: any = [];
  @Input() data: {modal: any, quartiers: any, mode: any, villes: any}
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ModalController) {
    // this.data.modal = this.navParams.get('value').modal;
    // this.data.mode = this.navParams.get('value').mode;
    this.devices = [
      { 'device': 'XAF' },
      { 'device': '€' },
      { 'device': '$' }
    ];
    this.device = 'XAF';
    if (this.data) {
      console.log('dataFromLocation', this.data.modal);
      if (this.data.modal === 'Type') {
        this.apparts = [
          { name: 'Appartement', isChecked: false },
          { name: 'Loft', isChecked: false },
          { name: 'Immeuble', isChecked: false }
        ];
        this.maisons = [
          { name: 'Maison', isChecked: false },
          { name: 'Châteaux', isChecked: false },
          { name: 'Manoir', isChecked: false },
          { name: 'Ferme', isChecked: false },
          { name: 'Châlet', isChecked: false }
        ];
      }
      if (this.data.modal === 'LocationVille' || this.data.modal === 'LocationQtier') {
        this.quartiers = this.navParams.get('value').quartiers;
        this.villes = this.navParams.get('value').villes;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
  }

  initializeItems() {
    this.items = this.quartiers;
  }

  initializeItemsV() {
    this.itemsV = this.villes;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getItemsV(ev: any) {
    // Reset items back to all of the items
    this.initializeItemsV();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.itemsV = this.itemsV.filter((item) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  getValue(quartier) {
    let add = true;
    this.selectQters.forEach(s => {
      if (s === quartier) add = false;
    });
    if (add && this.selectQters.length < 3) this.selectQters.push(quartier);
    this.searchQuery = '';
  }

  getValueV(ville) {
    let add = true;
    this.selectVilles.forEach(s => {
      if (s === ville) add = false;
    });
    if (add && this.selectVilles.length < 1) this.selectVilles.push(ville);
    this.searchQuery = '';
  }

  removeElt(i) {
    this.selectQters.splice(i, 1);
  }

  removeEltC(i) {
    this.selectVilles.splice(i, 1);
  }

  closeModal(val = '') {
    this.count = 0;
    if (this.data.modal === 'LocationVille') {
      this.viewCtrl.dismiss(this.selectVilles);
    } else if (this.data.modal === 'LocationQtier') {
      this.viewCtrl.dismiss(this.selectQters);
    } else if (this.data.modal === 'Criteria') {
      this.viewCtrl.dismiss(this.selectCriteria);
    } else if (this.data.modal === 'Type') {
      this.getCheckedvalue();
      this.viewCtrl.dismiss(this.checkeds);
    } else if (this.data.modal === 'Prix') {
      this.viewCtrl.dismiss({ min: this.prixI, max: this.prixS, device: this.device });
    } else if (this.data.modal === 'Surface') {
      this.viewCtrl.dismiss({ min: this.surfI, max: this.surfS });
    } else if (this.data.modal === 'Arrive') {
      this.viewCtrl.dismiss(this.vle_arr);
    }
    else if (this.data.modal === 'Loading') {
      this.viewCtrl.dismiss('');
    }
    if (val !== '') {
      this.viewCtrl.dismiss(val);
    }
    // this.viewCtrl.dismiss();
  }

  getCheckedvalue() {
    this.checkedApparts = this.apparts.filter(value => {
      return value.isChecked;
    });
    this.checkedMaisons = this.maisons.filter(value => {
      return value.isChecked;
    });
    // this.checkeds = this.checkedApparts.concat(this.checkedMaisons);
    this.checkeds = [];
    if (this.maison) this.checkeds.push('Maison');
    if (this.appart) this.checkeds.push('Appartement');
    if (this.chambre) this.checkeds.push('Chambre');
    if (this.studio) this.checkeds.push('Studio');
    if (this.colocation) this.checkeds.push('Co-Location');
    if (this.commerce) this.checkeds.push('Bureau | Commerce');
    if (this.store) this.checkeds.push('Entrepot | Magasin');
    if (this.parking) this.checkeds.push('Parking');
    if (this.autre) this.checkeds.push('Autres');
    if (this.space) this.checkeds.push('Espace Libre');
    if (this.terrain) this.checkeds.push('Terrain');
    if (this.salle) this.checkeds.push('Salle');
    if (this.boutique) this.checkeds.push('Boutique');
    if (this.fondCommerce) this.checkeds.push('Fond De Commerce');
  }

  changeApp() {
    if (this.appart) {
      this.apparts.forEach(ap => {
        ap.isChecked = true;
      });
    } else {
      this.apparts.forEach(ap => {
        ap.isChecked = false;
      });
    }
  }

  changeApps() {
    this.checkedApparts = this.apparts.filter(value => {
      return value.isChecked;
    });
    if (this.checkedApparts.length !== this.apparts.length) this.appart = false;
    else this.appart = true;
  }

  changeMsn() {
    if (this.maison) {
      this.maisons.forEach(ap => {
        ap.isChecked = true;
      });
    } else {
      this.maisons.forEach(ap => {
        ap.isChecked = false;
      });
    }
  }

  changeMsns() {
    this.checkedMaisons = this.maisons.filter(value => {
      return value.isChecked;
    });
    if (this.checkedMaisons.length !== this.maisons.length) this.maison = false;
    else this.maison = true;
  }

  changeChm() {
    console.log(this.chambre);
  }

  changeStd() {
    console.log(this.studio);
  }

  onKeyPrice(event, inpt) {
    let inputValue = event.target.value.replace(/\s/g, "");
    // console.log(inputValue);
    if (inpt === 'min') this.prixI = inputValue;
    else if (inpt === 'max') this.prixS = inputValue;
  }

  onKeySurf(event, inpt) {
    let inputValue = event.target.value.replace(/\s/g, "");
    // console.log(inputValue);
    if (inpt === 'min') this.surfI = inputValue;
    else if (inpt === 'max') this.surfS = inputValue;
  }

  onKeyCriteria(event) {
    let inputValue = event.target.value.trim();
    let add = true;
    if (inputValue.length > 3) {
      if (event.key === "Enter") {
        this.selectCriteria.forEach(s => {
          if (s === inputValue) add = false;
        });
        if (add && this.selectCriteria.length < 5) this.selectCriteria.push(inputValue);
        this.searchCrt = '';
      } else if (event.keyCode == 32) {
        this.selectCriteria.forEach(s => {
          if (s === inputValue) add = false;
        });
        if (add && this.selectCriteria.length < 5) this.selectCriteria.push(inputValue);
        this.searchCrt = '';
      }
    }
  }

  selectThisV(event) {
    this.count = 0;
    // console.log(event);
    const ville = this.searchQuery;
    if (ville !== null && ville !== '' && ville.length > 3) {
      let add = true;
      this.selectVilles.forEach(s => {
        if (s === ville) add = false;
      });
      if (add && this.selectVilles.length < 3) this.selectVilles.push(ville);
      this.searchQuery = '';
    }
  }

  writeThisV(event) {
    // console.log(event.key);
    const ville = this.searchQuery;
    if (ville !== null && ville !== '' && ville.length > 3) {
      let add = true;
      this.selectVilles.forEach(s => {
        if (s === ville) add = false;
      });
      if (add && this.selectVilles.length < 3 && this.count === 0) this.selectVilles[this.selectVilles.length] = ville;
      else if (add && this.selectVilles.length < 3 && this.count > 0) this.selectVilles[this.selectVilles.length - 1] = ville;
      // if(this.data.mode === 'Coloc' || this.data.mode === 'Locat') {
      // } else if(this.data.mode === 'Terrain') {
      // }
      this.count += 1;
    }
    // console.log(this.selectQters);
  }

  selectThis(event) {
    this.count = 0;
    // console.log(event);
    const quartier = this.searchQuery;
    if (quartier !== null && quartier !== '' && quartier.length > 3) {
      let add = true;
      this.selectQters.forEach(s => {
        if (s === quartier) add = false;
      });
      if (add && this.selectQters.length < 3) this.selectQters.push(quartier);
      this.searchQuery = '';
      if (this.data.mode === 'Coloc' || this.data.mode === 'Locat') {
      } else if (this.data.mode === 'Terrain') {
      }
    }
    // console.log(this.selectQters);
  }

  writeThis(event) {
    // console.log(event.key);
    const quartier = this.searchQuery;
    if (quartier !== null && quartier !== '' && quartier.length > 3) {
      let add = true;
      this.selectQters.forEach(s => {
        if (s === quartier) add = false;
      });
      if (add && this.selectQters.length < 3 && this.count === 0) this.selectQters[this.selectQters.length] = quartier;
      else if (add && this.selectQters.length < 3 && this.count > 0) this.selectQters[this.selectQters.length - 1] = quartier;
      if (this.data.mode === 'Coloc' || this.data.mode === 'Locat') {
      } else if (this.data.mode === 'Terrain') {
      }
      this.count += 1;
    }
    // console.log(this.selectQters);
  }

}
