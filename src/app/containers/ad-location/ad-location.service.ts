import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AdLocationService {
  constructor(private http: HttpClient) { }

  public readonly countriesLatAndLng = {
    1: [6.3710018934736725, 2.375170453394503], //BENIN 
    12: [12.629269, -7.984865], //MALI
    18: [14.760286487057229, -17.23090096688702], //SENEGAL
    25: [6.815478, -5.280242], //IVORY COST
    29: [11.155045, -4.304877],
    30: [3.837979, 11.513006],
    36: [-4.452081, 15.273559], //RDC
    43: [5.846654505540228, 21.007982953394503], //AUTRE
  };

  private readonly urls = {
    categories: "https://prod.coinafrique.com/category",
    countries: "https://prod.coinafrique.com/countries_list",
    ads: "https://prod.coinafrique.com/ads/?offset=0",
  }

  getCategories() {
    return this.http.get(this.urls.categories)
  }

  getAds(country, category, limit, keyword, days) {
    let req = this.urls.ads;
    if (category && category != "") {
      req = req + "&category=" + category;
    }

    if (parseInt(limit) > 0) {
      req = req + "&limit=" + limit;
    }

    if (parseInt(country) > 0) {
      req = req + "&pays=" + country;
    }
    if (parseInt(days)) {
      req = req + "&days=" + days;
    }

    if (keyword && keyword != "") {
      req = req + "&keyword=" + keyword;
    }

    return this.http.get(req);
  }

  getCountries() {
    return this.http.get(this.urls.countries);
  }

  initializeLatAndLng(country) {
    return this.countriesLatAndLng[country];
  }
}
