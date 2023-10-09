import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HostProvider} from "../host/host";
import {Observable} from "rxjs";


@Injectable()
export class DataImtesProvider {

  api: any;
  url_image: any;
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
    this.url_image = host.url_image;
  }

  searchImmo(object): Observable<any> {
    console.log(this.api + 'search/immo');
    return this.http.post(
      this.api + 'search/immo',
      object,
      this.options
    );
  }

  deleteImmo(id): Observable<any> {
    console.log(this.api + 'immo/delete/' + id);
    return this.http.get(
      this.api + 'immo/delete/' + id
    );
  }

  getUrlImg() {
    return this.url_image;
  }

}
