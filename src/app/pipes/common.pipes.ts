import { Pipe, PipeTransform } from '@angular/core';
import { ICountry } from '../services/country.service'

@Pipe({ name: 'readableBooleanFr' })
export class ReadableBooleanFrPipe implements PipeTransform {
  transform(value: boolean, args: Array<any>): string {
    return value ? 'Oui' : 'Non'
  }
}

@Pipe({ name: 'redableCountryName' })
export class ReadableCountryName implements PipeTransform {
  transform(country_code: string, country_list: Array<ICountry>): string|void {
    if (country_code && country_list) {
      const formattedCode: string = country_code.toUpperCase()
      const country: ICountry = country_list.find(c => c.code === formattedCode)

      return country ? country.nom : formattedCode
    }
  }
}
