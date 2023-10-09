import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HostProvider} from "../host/host";
import {Observable} from "rxjs";


/*
  Generated class for the DataUsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataUsersProvider {
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

  // Liste des Filiales de l'agence
  loginUser(object): Observable<any> {
    console.log(this.api + 'user/login');
    return this.http.post(
      this.api + 'user/login',
      object,
      this.options
    );
  }

  // Liste des Filiales de l'agence
  forgetPass(object): Observable<any> {
    console.log(this.api + 'user/forget/password');
    return this.http.post(
      this.api + 'user/forget/password',
      object,
      this.options
    );
  }

  // Liste des Filiales de l'agence
  addUser(object): Observable<any> {
    console.log(this.api + 'user/register');
    return this.http.post(
      this.api + 'user/register',
      object,
      this.options
    );
  }

  // Liste des Filiales de l'agence
  sendCode(code): Observable<any> {
    console.log(this.api + 'user/valid/email');
    return this.http.post(
      this.api + 'user/valid/email',
      code,
      this.options
    );
  }

  // Liste des Filiales de l'agence
  checkUserByCniOrPhoneOrEmail(object): Observable<any> {
    console.log(this.api + 'user/check');
    return this.http.post(
      this.api + 'user/check',
      object,
      this.options
    );
  }

  // Liste des Filiales de l'agence
  addImmo(object): Observable<any> {
    console.log(this.api + 'immo/register');
    return this.http.post(
      this.api + 'immo/register',
      object,
      this.options
    );
  }

  // Liste des Filiales de l'agence
  getImmosUser(id): Observable<any> {
    console.log(this.api + 'immos/user/' + id);
    return this.http.get(
      this.api + 'immos/user/' + id
    );
  }

  // Liste des Filiales de l'agence
  getTypeUser(type): Observable<any> {
    console.log(this.api + 'user/type/' + type);
    return this.http.get(
      this.api + 'user/type/' + type
    );
  }

}
