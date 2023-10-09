import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(public translate: TranslateService) {
    let v = this.translate.instant("BAD_NETWORK");
  }

  ngOnInit() {
  }

}
