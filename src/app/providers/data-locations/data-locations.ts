import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostProvider} from "../host/host";
import {Observable} from "rxjs";


/*
  Generated class for the DataLocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataLocationsProvider {

  api: any;
  options: any;

  constructor(public http: HttpClient, public hostProvider: HostProvider) {
    this.options = {
      headers: new Headers({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json'
      })
    };
    const host = this.hostProvider.buildHost();
    this.api = host.api;
  }

  getVillesPays(nom): Observable<any> {
    console.log(this.api + 'villes/pays/' + nom);
    return this.http.get(
      this.api + 'villes/pays/' + nom
    );
  }

  getQuartierVille(pays, ville): Observable<any> {
    console.log(this.api + 'quartiers/ville/' + pays + '/' +ville);
    return this.http.get(
      this.api + 'quartiers/ville/' + pays + '/' +ville
    );
  }

  getQuartiersPays(pays): Observable<any> {
    console.log(this.api + 'quartiers/pays/' + pays);
    return this.http.get(
      this.api + 'quartiers/pays/' + pays
    );
  }

  getPrm(): Observable<any> {
    console.log(this.api + 'parameters');
    return this.http.get(
      this.api + 'parameters'
    );
  }

  getNotif(): Observable<any> {
    console.log(this.api + 'notifications');
    return this.http.get(
      this.api + 'notifications'
    );
  }

}
