export interface CountryModel {
  name : {
    common: string;
  };
  capital: string[];
  continents: string[];
  flags: {
    png: string;
  }
  currencies: Map<string, CurrencyModel>;
  languages: Map<string,string>;
  population: number;
  timezones: string[];
}

export interface CurrencyModel {
  name: string;
  symbol: string;
}

export interface CountryResponseModel {
  name : string
  capital: string;
  continents: string;
  flags: string
  currencies: Map<string, CurrencyModel>;
  languages: Map<string,string>;
  population: number;
  timezones: string;
}
