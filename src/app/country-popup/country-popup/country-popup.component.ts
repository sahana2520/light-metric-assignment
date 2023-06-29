import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CountryResponseModel} from "../../model/country-model";

@Component({
  selector: 'app-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.less']
})
export class CountryPopupComponent {
  currency: string;
  languages: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: CountryResponseModel ) {
    this.currency = this.data?.currencies && Object.values(this.data?.currencies)[0].name;
    this.languages = this.data?.languages && Object.values(this.data?.languages).toString().replace(/,/g, ', ');
  }
}
