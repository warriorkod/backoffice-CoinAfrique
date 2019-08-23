import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';

@Component({
  selector: 'ad-modal',
  templateUrl: './ad-modal.component.html',
  styleUrls: ['./ad-modal.component.css']
})

export class AdModalComponent {
  public ad: any;
  public isAdLoading: boolean = false;

  private _adId: string;

  constructor(private _announceService: AnnonceService) {
  }

  @Output()
  public resetSelectedAdId: EventEmitter<boolean> = new EventEmitter()

  @Input()
  public set adId(value: string) {
    this._adId = value

    if (value) {
      this.isAdLoading = true
      this.getAdPayload()
    }
  }

  public get adId(): string {
    return this._adId
  }

  private getAdPayload(): void {
    this._announceService.getAnnonceById(this.adId)
      .subscribe(
        res => {
          this.ad = res;
          this.showPopup()
        },
        err => {
          console.log(err);
          return false;
        },
        () => {
          this.isAdLoading = false
          this.adId = null;
          this.resetSelectedAdId.emit(true)
        }
      );
  }

  private showPopup(): void {
    document.getElementById('ad-modal-show-button').click()
  }
}
