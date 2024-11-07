import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @Input({ required: true }) title: string = "Titulo del modal";
  @Input({ required: true }) buttonFunction!: Function;
  @Input() buttonName: 'Guardar' | 'Actualizar' = "Guardar";
  
  modal: any;
  private _isOpenModal = false;

  @Input()
  get isOpenModal(): boolean {
    return this._isOpenModal;
  }

  set isOpenModal(value: boolean) {
    this._isOpenModal = value;
    if (this._isOpenModal && this.modal) {
      this.modal.show();
    } else if (this.modal) {
      this.modal.hide();
    }
    this.isOpenModalChange.emit(this._isOpenModal);
  }

  @Output() isOpenModalChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(document.getElementById('citaModal'));
  }

  public executeFunction() {
    if(this.buttonFunction) {
      this.buttonFunction();
      this.closeModal();
    }
  }

  public closeModal() {
    this.isOpenModal = false;
  }
}
