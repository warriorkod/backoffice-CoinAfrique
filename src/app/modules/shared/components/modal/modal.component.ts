import { Component, Input} from "@angular/core"

// Modal component
// Could be called as
// this._store.dispatch(new modalActions.showModal({id: 'your-modal-id}))


@Component({
  selector: 'bo-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalTitle: string = "Informations détaillées"
  @Input() modalId: string = 'banners-modal'
}
