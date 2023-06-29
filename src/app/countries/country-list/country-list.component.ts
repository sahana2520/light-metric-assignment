import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../services/country-service";
import {CountryResponseModel} from "../../model/country-model";
import {MatDialog} from "@angular/material/dialog";
import {CountryPopupComponent} from "../../country-popup/country-popup/country-popup.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.less']
})
export class CountryListComponent implements OnInit {
  countries: CountryResponseModel[];
  fullCountryList: any;
  showMoreCards: number = 20;
  searchInput: string = "";
  email: string = "";
  isLoading = true

  constructor(
    private countryService: CountryService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data: CountryResponseModel[]): void => {
      this.isLoading = false
      this.fullCountryList = data.sort((a: CountryResponseModel, b: CountryResponseModel): number => (a.name > b.name) ? 1 : -1);
      this.countries = data.slice(0, this.showMoreCards);
    });
  }

  showMore(): void {
    this.showMoreCards = this.showMoreCards + 20;
    this.countries = this.fullCountryList.slice(0, this.showMoreCards);
  }

  enableButton(): void {
    const button: any = document.querySelector('button');
    button.disabled = this.searchInput === '';
  }

  userSubscription(): void {
    this._snackBar.open(this.email + " " + "subscribed successfully", "Close", {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    this.email = "";
  }

  getSearchCountries(): void {
    this.isLoading = true
    this.countryService.getSearchedCountries(this.searchInput).subscribe((data: CountryResponseModel[]): void => {
        this.isLoading = false
        this.fullCountryList = data.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
        this.countries = data.slice(0, 20);
      },
      (): void => {
        this.isLoading = false;
        this.countries = [];
        this._snackBar.open("Api Failed", "Close", {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
  }

  openDialog(event: CountryResponseModel): void {
    this.dialog.open(CountryPopupComponent, {
      data: event
    });
  }
}
