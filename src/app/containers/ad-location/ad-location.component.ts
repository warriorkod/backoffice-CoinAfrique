import {
  Component,
  OnInit,
} from '@angular/core';
import { MouseEvent } from "@agm/core";
import { FormGroup, FormControl } from '@angular/forms';
import { AdLocationService } from "./ad-location.service";

@Component({
  selector: "ad-location",
  templateUrl: "./ad-location.component.html",
  styleUrls: ["./ad-location.component.css"]
})

export class AdLocationComponent implements OnInit {
  public countrySelected: number = 18;
  public limitSelected: number = 250;

  public myForm: FormGroup = new FormGroup({
    country: new FormControl(""),
    category: new FormControl(""),
    limit: new FormControl(""),
    keyword: new FormControl(""),
    daysName: new FormControl(""),
  });

  public categories: any;

  constructor(private _adLocationService: AdLocationService) { }
  // google maps zoom level
  public zoom: number = 8;
  public days: any;

  // initial center position for the map
  public lat: number = 14.696262;
  public lng: number = -17.462071;

  public markers: marker[] = [];
  public countries: any = [];

  ngOnInit(): void {
    this.countrySelected = 18;

    this._adLocationService
      .getCountries()
      .subscribe(
        res => {
          this.countries = res;
        }, err => {
          return false;
        });

    this._adLocationService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.getMarkers(this.countrySelected, null, this.limitSelected, null, null);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  getMarkers(country, category, limit, keyword, days) {
    this.markers = [];
    this.countrySelected = country;
    this._adLocationService
        .getAds(country, category, limit, keyword, days)
        .subscribe((data: Array<any>) => {
          let adWithLocation = data.filter(ad => ad["latitude"] != 0);

          this.lat = this._adLocationService.initializeLatAndLng(country)[0];
          this.lng = this._adLocationService.initializeLatAndLng(country)[1];

          adWithLocation.map(ad => {
            this.markers.push({
              lat: ad["latitude"],
              lng: ad["longitude"],
              ad_titre: ad["titre"],
              username: ad["user"]["first_name"] + " " + ad["user"]["last_name"],
              draggable: false
            });
          });

          this.zoom = 8;
        });
  }

  onSubmit() {
    const country = this.myForm.value.country,
      category = this.myForm.value.category,
      limit = this.myForm.value.limit,
      days = this.myForm.value.daysName,
      keyword = this.myForm.value.keyword;
    this.getMarkers(country, category, limit, keyword, days);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  ad_titre?: string;
  username?: string;
  draggable: boolean;
}
