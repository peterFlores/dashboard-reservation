import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ReservationPerUser } from 'src/app/layouts/client-layout/components/reservation-per-user/reservation-per-user.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  selectedRow: ReservationPerUser;
  @ViewChild('myTable') table: any;
  entries: number = 10;
  selected: any[] = [];
  activeRow: any;
  focus5;
  statusRes: string;
  list: ReservationPerUser[] = [];
  confirmationModal: BsModalRef;
  confirmation = {
    keyboard: true,
    class: "modal-danger modal-dialog-centered"
  }
  expanded: any = {};
  columns: any =[
    { name: "Transaccion" , prop: "id"},
    { name: "Tipo de pago" , prop: "payment_type"},
    { name: "Fecha de reservacion" , prop: "created_at"},
    { name: "Estatus" , prop: "status"},
    { name: "Total" , prop: "total"}
  ];
  reservations: ReservationPerUser[] = [];
  temp: ReservationPerUser[] = [];
  constructor(private _reservationService: ReservationService, private _modalService: BsModalService,
    private _authService: AuthService, private _alertService: AlertService) { }

  ngOnInit() {
    this._reservationService.findAll().subscribe(data => {
      this.reservations = data;
      this.temp = this.reservations;
    });
  }

  changeReservation($event) {
    this._reservationService.findByStatus($event.target.value).subscribe(data => {
      this.temp = data;
      console.log(this.temp);
    })
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }
  openDefaultModal(modalDefault: TemplateRef<any>, row: ReservationPerUser) {
    this.selectedRow = row;
    this.confirmationModal = this._modalService.show(modalDefault, this.confirmation);
  }
  changeStatus(row: ReservationPerUser) {
    console.log(row);
    let res: ReservationPerUser = row;
    res.status = this.statusRes;
    console.log(row);
    this._reservationService.changeStatus(row).subscribe(data => {
      this.showSuccess("ESTADO ACTUALIZADO CON EXITO");
    });
  }
  status($event) {
    this.statusRes = $event.target.value;
  }
  showSuccess(message: string) {
    this._alertService.success(message, { autoClose: true, keepAfterRouteChange: false})
  }
  showError(message: string) {
    this._alertService.error(message, { autoClose: true, keepAfterRouteChange: true})
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  
  filterTable($event) {
    let val = $event.target.value.toString().toLowerCase();
    console.log(val);
    let count = this.columns.length;
    let keys = Object.keys(this.list[0]);
    this.temp = this.list.filter(item => {

      for (let i = 0; i < count; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });

  }

}
