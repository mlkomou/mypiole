import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HostProvider {
  private initHost = null;
  private serverLocalHost = 'https://admin.immobilier-cm.com';
  // private serverLocalHost = 'http://151.80.147.188';

  public host = null;

  /**
   * true pour online, false pour offline
   */
  private line = true;
  constructor(public http: HttpClient) { }


  buildHost() {
    // console.log(`${this.serverLocalHost}/MP/web/api/`);
    if (this.line) {
      return {
        api: `${this.serverLocalHost}/api/`,
        url_image: `${this.serverLocalHost}/web/media/`
      };
    } else {
      return {
        api: 'http://localhost/Root/MyPiole/web/api/',
        url_image: 'http://localhost/Root/MyPiole/web/media/'
      };
    }
  }

}
