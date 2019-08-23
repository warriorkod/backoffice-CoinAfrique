import { ApisBaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CountryService extends ApisBaseService {
	constructor(protected _http: HttpClient) {
		super(_http);
	}

	getCountryData() {
		const url = `${environment.BO_SRV_URL}/backend/params/countries`;
		return this.getRequest(url);
	}
}

export interface ICountry {
	name: string;
	code: string;
	nom?: string
	id?: string|number;
}
