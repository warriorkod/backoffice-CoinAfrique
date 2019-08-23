import { ILink, ILinkParams, IFullLinkParams } from "./interfaces";
import { environment } from "environments/environment";

export class FullAnnonceLink implements ILink {
  public params: IFullLinkParams
  public url: string
  public linkSubdomain: string = "web";

  constructor(params: IFullLinkParams) {
    this.params = params
    this.url  = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${environment.FIREBASE_DYNAMIC_LINK_KEY}`
  }

  public get data(): any {
    return {
      longDynamicLink: this.buildDynamicLink(),
      suffix: { option: 'SHORT' }
    }
  }

  private buildDynamicLink(): string {
    return `https://je55n.app.goo.gl/?` +
      `link=http://coinafrique.com/ad/` +
      `${this.params.id}&apn=com.devengine.paladin.coinafrique` +
      `&ibi=com.coinafrique.ios&ofl=` +
      `https://${this.linkSubdomain}.coinafrique.com/details` +
      `/${this.params.id}&st=${this.params.ad_title}&` +
      `si=${this.params.ad_photo_url}` +
      `&utm_source=BackOffice&utm_medium=engagement`
  }
}

export class AnnonceLink implements ILink {
  public url: string;
  public params: ILinkParams

  constructor(params: ILinkParams) {
    this.params = params
    this.url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${environment.FIREBASE_DYNAMIC_LINK_KEY}`
  }

  public get data(): any {
    return {
      longDynamicLink: this.buildDynamicLink(),
      suffix: { option: 'SHORT' }
    };
  }

  private buildDynamicLink(): string {
    return `https://je55n.app.goo.gl/?link=http://coinafrique.com/ad/` +
    `${this.params.id}&apn=com.devengine.paladin.coinafrique&ibi=` +
    `com.coinafrique.ios`
  }
}
