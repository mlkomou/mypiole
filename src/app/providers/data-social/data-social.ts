import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HostProvider} from "../host/host";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";


@Injectable()
export class DataSocialProvider {
  options: any;
  api_social;
  app: any;
  api_social_ai;

  constructor(public http: HttpClient, public database: AngularFireDatabase, public hostProvider: HostProvider,
              // public db: afd.AngularFireDatabase
  ) {
    this.options = {
      headers: new Headers({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json'
      })
    };
    const host = this.hostProvider.buildHost();
    // this.init();
  }

  getRef(ref) {
    return this.app.database().ref(ref);
  }

  //Add Comment
  addComment(object): Observable<any> {
    return new Observable<Array<any>>(resolve => {
      this.database.database.ref('comments/' + object.id).push(object).then((r: any) => {
        console.log(resolve);
      });
    });
  }

  getMessageList(immo: any) {
    return this.database.list('comments/' + immo);
  }

}
