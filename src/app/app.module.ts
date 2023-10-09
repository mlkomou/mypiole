import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import firebase from 'firebase/compat/app';
import {environment} from "../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Network} from "@awesome-cordova-plugins/network/ngx";
import {Camera} from "@awesome-cordova-plugins/camera/ngx";
import {SocialSharing} from "@awesome-cordova-plugins/social-sharing/ngx";
import {HostProvider} from "./providers/host/host";
import {DataUsersProvider} from "./providers/data-users/data-users";
import {DataLocationsProvider} from "./providers/data-locations/data-locations";
import {DataImtesProvider} from "./providers/data-imtes/data-imtes";
import {DataSocialProvider} from "./providers/data-social/data-social";
import {NetworkProvider} from "./providers/network/network";
import {LocalStorageProvider} from "./providers/local-storage/local-storage";

const firebaseApp = firebase.initializeApp(environment.firebaseConfig);



export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    SocialSharing,
    // AppVersion,
    Network,
    HostProvider,
    DataUsersProvider,
    DataLocationsProvider,
    DataImtesProvider,
    DataSocialProvider,
    NetworkProvider,
    LocalStorageProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
