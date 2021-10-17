import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationPerUser } from './reservation-per-user.model';

@Component({
  selector: 'app-reservation-per-user',
  templateUrl: './reservation-per-user.component.html',
  styleUrls: ['./reservation-per-user.component.scss']
})
export class ReservationPerUserComponent implements OnInit {
  @ViewChild('myTable') table: any;
  entries: number = 10;
  selected: any[] = [];
  activeRow: any;
  focus5;
  list: ReservationPerUser[] = [];
  temp: ReservationPerUser[] = [];
  
  expanded: any = {};
  columns: any =[
    { name: "Transaccion" , prop: "id"},
    { name: "Tipo de pago" , prop: "payment_type"},
    { name: "Fecha de reservacion" , prop: "created_at"},
    { name: "Estatus" , prop: "status"},
    { name: "Total" , prop: "total"}
  ];
  constructor(private _authService: AuthService,
    private _reservationService: ReservationService) { }

  ngOnInit() {
    let id = this._authService.currentUserValue.userId;
    this._reservationService.findByUserId(id).subscribe(data => {
      if (data.length > 0) {
        this.list = data;
        this.temp = this.list;
        console.log(data);
      } else {

      }
    });
  }
  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
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
