import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CountryModel, CountryResponseModel} from "../model/country-model";

@Injectable()
export class CountryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCountries(): Observable<CountryResponseModel[]> {
    return this.http.get("https://restcountries.com/v3.1/all").pipe(
      map(
        (country: any): CountryResponseModel[] => {
            return country.map(
              (data: CountryModel): CountryResponseModel => this.getCountryMappedData(data)
            );
        }
      )
    );
  }

  getSearchedCountries(value: string): Observable<CountryResponseModel[]> {
    return this.http.get(" https://restcountries.com/v3.1/name/"+value).pipe(
      map(
        (country: any): CountryResponseModel[] => {
          return country.map(
            (data: CountryModel): CountryResponseModel => this.getCountryMappedData(data)
          );
        }
      )
    );
  }

  getCountryMappedData(data: CountryModel): CountryResponseModel {
    return {
      name : data.name?.common,
      capital: data.capital ? data.capital[0] : "",
      continents: data.capital ? data.continents[0] : "",
      flags: data.flags.png,
      currencies: data.currencies,
      languages: data.languages,
      population: data.population,
      timezones: data.timezones ? data.timezones[0] : ""
    }
  }
}

