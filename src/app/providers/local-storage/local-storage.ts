import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import {key} from "ionicons/icons";


/*
  Generated class for the LocalPreferencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {


  constructor() { }

  isNewUser(): Promise<any> {
    return this.getAllElement('SPLASH').then(result => {
      console.log(result);
      let ret = false;
      // const res = result && result.indexOf(1) !== -1;
      if (result.value === null) {
        ret = true;
      }
      return ret;
    });
  }

  isOldUser(): Promise<any> {
    return Preferences.set({key: 'SPLASH', value: 'OLD'}).then(result => {
      console.log(result);
      let ret = false;
      if (result === null) {
        ret = true;
      }
      return ret;
    });
  }

  isNewReservation(): Promise<any> {
    return this.getAllElement('USER').then(result => {
      console.log(result);
      let ret = false;
      // const res = result && result.indexOf(1) !== -1;
      if (result === null) {
        ret = true;
      }
      return ret;
    });
  }

  getReservations(): Promise<any> {
    return this.getAllElement('RESERVATION').then(result => {
      // console.log(result);
      if (result.value != null) { return result.value; }
      return null;
    }).catch(function (reason) {
      console.log(reason);
      return null;
    });
  }

  getUser(): Promise<any> {
    return this.getAllElement('USER').then(result => {
      // console.log(result);
      if (result.value != null) { return result.value; }
      return null;
    }).catch(function (reason) {
      console.log(reason);
      return null;
    });
  }

  addReservations(reservations): Promise<any> {
    return Preferences.set({key: 'RESERVATION', value: JSON.stringify(reservations)}).then(result => {
      // console.log('set Object in storage: ' + result);
      return true;
    }).catch(function (reason) {
      console.error(reason);
      return false;
    });
  }

  updateReservation(rs): Promise<any> {
    return this.getReservations().then((rep: any) => {
      if (rep.value !== null) {
        let reservations = JSON.parse(rep.value);
        let newRes = [];
        reservations.forEach(obj => {
          if (obj.user_id !== rs.user_id && obj.voyage_id !== rs.voyage_id) {
            console.log(rs);
            console.log(obj);
            newRes.push(obj);
          }
        });
        newRes.push(rs);
        console.log(newRes);
        return Preferences.set({key: 'RESERVATION', value: JSON.stringify(newRes)});
      } else {
        return Preferences.set({key: 'RESERVATION', value: JSON.stringify([rs])});
      }
    });
  }

  getFavorites(): Promise<any> {
    return this.getAllElement('FAVORITE').then(result => {
      if (result.value != null) { return result.value; }
      return null;
    }).catch(function (reason) {
      console.log(reason);
      return null;
    });
  }

  addFavorite(favorite): Promise<any> {
    return this.getFavorites().then((rep: any) => {
      if (rep.value !== null) {
        let favorites = JSON.parse(rep.value);
        let push = true;
        favorites.forEach(obj => {
          if (obj.id === favorite.id && obj.type === favorite.type) {
            push = false;
          }
        });
        if (push) favorites.push(favorite);
        return Preferences.set({key: 'FAVORITE', value: JSON.stringify(favorites)});
      } else {
        return Preferences.set({key: 'FAVORITE', value: JSON.stringify([favorite])});
      }
    });
  }

  rmFavorite(favorite): Promise<any> {
    return this.getFavorites().then((rep: any) => {
      if (rep.value !== null) {
        console.log(favorite);
        let favorites = JSON.parse(rep.value);
        let newRes = [];
        favorites.forEach(obj => {
          if (obj.id === favorite.id && obj.type === favorite.type) {}
          else newRes.push(favorite);
        });
        console.log(newRes);
        return Preferences.set({key: 'FAVORITE', value: JSON.stringify(newRes)});
      }
    });
  }

  addUser(user): Promise<any> {
    return Preferences.set({key: 'USER', value: JSON.stringify(user)}).then(result => {
      // console.log('set Object in storage: ' + result);
      return result;
    }).catch(function (reason) {
      console.error(reason);
      return false;
    });
  }

  getVilles(): Promise<any> {
    return this.getAllElement('VILLE').then(result => {
      if (result.value != null) { return result.value; }
      return null;
    }).catch(function (reason) {
      console.log(reason);
      return null;
    });
  }

  addVille(ville): Promise<any> {
    return Preferences.set({key: 'VILLE', value: JSON.stringify(ville)}).then(result => {
      // console.log('set Object in storage: ' + result);
      return result;
    }).catch(function (reason) {
      console.error(reason);
      return false;
    });
  }

  getQuartiers(): Promise<any> {
    return this.getAllElement('QUARTIER').then(result => {
      if (result.value != null) { return result.value; }
      return null;
    }).catch(function (reason) {
      console.log(reason);
      return null;
    });
  }

  addQuartier(quartier): Promise<any> {
    return Preferences.set({key: 'QUARTIER', value: JSON.stringify(quartier)}).then(result => {
      // console.log('set Object in storage: ' + result);
      return result;
    }).catch(function (reason) {
      console.error(reason);
      return false;
    });
  }

  getPrm(): Promise<any> {
    return this.getAllElement('PRM').then(result => {
      console.log('PPPRMADED', result);
      if (result.value != null) { return result.value; }
      return null;
    }).catch(function (reason) {
      console.log(reason);
      return null;
    });
  }

  addPrm(prm): Promise<any> {
    console.log('aaaaadddingPRM', prm);
    return Preferences.set({
      key: 'PRM', value: JSON.stringify(prm)
    }).then(result => {
      return result;
    }).catch(function (reason) {
      console.error(reason);
      return false;
    });
  }

  getAllElement(STORAGE_KEY): Promise<any> {
    return Preferences.get({key: STORAGE_KEY});
  }

}
