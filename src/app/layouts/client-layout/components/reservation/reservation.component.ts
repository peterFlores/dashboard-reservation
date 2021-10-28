import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Hostal } from "src/app/layouts/admin-layout/components/hostal/hostal.model";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { HostalService } from "src/app/services/hostal.service";
import { ReservationService } from "src/app/services/reservation.service";
import { CapacityArray, Reservation } from "./reservation.model";


// core components

@Component({
  selector: "app-reservation",
  templateUrl: "reservation.component.html",
  styleUrls: ["reservation.component.scss"]

})
export class ReservationComponent implements OnInit {
  filterForm: FormGroup;
  paymentForm: FormGroup;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  temp: Hostal[] = [];
  list: Hostal[] = [];
  submitted = false;
  submittedPay = false;
  showCheckout = false;
  showRooms = false;
  type = '';
  reservation: CapacityArray[] = [];
  checkoutItem: CapacityArray;
  entries: number = 10;
  selected: any[] = [];
  activeRow: any;
  columns: any = [
    { name: "Nombre Hostal" , prop: "type", },
    { name: "Habitaciones" , prop: "rooms"},
    { name: "Precio" , prop: "total_price"},
    { name: "Disponibilidad" , prop: "availability"}
  ];


  constructor( private _formBuilder: FormBuilder, 
    private _authService: AuthService,
    private _reservationService: ReservationService,
    private _route: Router,
    private _alertService: AlertService,
    private _hostalService: HostalService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this._hostalService.getHostal().subscribe(data => {
      this.list = data;
      this.temp = data;
      console.log(this.list);
    });
    this.filterForm = this._formBuilder.group({
      date: ['', [Validators.required]],
      adults: [0, [Validators.required, Validators.min(1)]],
      childs: [0, [Validators.required, Validators.min(0)]],
      hostal: ['', [Validators.required]],
      affi_type: [null]
    });
  }
  get f() { return this.filterForm.controls; }
  get p() { return this.paymentForm.controls; }

  public updateOptions() {
 
  }

  selectForCheckout(item: CapacityArray) {
    if (item) this.showCheckout = true;
    this.checkoutItem = item;
    this.paymentForm = this._formBuilder.group({
      paymentType: ['', [Validators.required]],
      correlativo: [''],
      nameoncard: [''],
      cardnumber: [''],
      ccv: [''],
      mmyy: ['']
    });
  }

  onSubmitPay() {
    this.submittedPay = true;
    if (this.paymentForm.invalid) {
      console.log(this.paymentForm);
      return;
    }
    var date1 = this.bsRangeValue[0];
    var date2 = this.bsRangeValue[1];
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    let json = {
      payment_type: this.paymentForm.get('paymentType').value,
      payment_details: this.paymentForm.get('correlativo').value,
      client: this._authService.currentUserValue.userId,
      total: this.checkoutItem.total_price,
      status: (this.paymentForm.get('paymentType').value === 'DEPOSITO') ? 'PENDING-CONFIRMATION' : 'CONFIRM',
      reservations: [
        {
          check_in: formatDate(this.bsRangeValue[0], 'yyyy-MM-dd', 'en-US'),
          check_out: formatDate(this.bsRangeValue[1], 'yyyy-MM-dd', 'en-US'),
          adults: this.filterForm.get('adults').value,
          childs: this.filterForm.get('childs').value,
          total: this.checkoutItem.total_price,
          nights: numberOfNights,
          hostal: this.filterForm.get('hostal').value._id,
          hostal_name: this.filterForm.get('hostal').value.name,
          room: this.checkoutItem._id,
          room_name: this.checkoutItem.type
        }
      ]
    };
    console.log(json);
    this._reservationService.create(json).subscribe(data => {
      this.showSuccess("RESERVACION EXITOSA");
      this._route.navigate(['/client/main']);
    });

  }

  showSuccess(message: string) {
    this._alertService.success(message, { autoClose: true, keepAfterRouteChange: false})
  }
  showError(message: string) {
    this._alertService.error(message, { autoClose: true, keepAfterRouteChange: true})
  }

  switchPaymentType(type) {
    if (type === 'DEPOSITO') {
      console.log(type);
      this.type = 'DEPOSITO';
      this.paymentForm.get('correlativo').setValidators(Validators.required);
      this.paymentForm.get('correlativo').updateValueAndValidity();
      this.paymentForm.get('nameoncard').clearValidators();
      this.paymentForm.get('nameoncard').updateValueAndValidity();
      this.paymentForm.get('cardnumber').clearValidators();
      this.paymentForm.get('cardnumber').updateValueAndValidity();
      this.paymentForm.get('ccv').clearValidators();
      this.paymentForm.get('ccv').updateValueAndValidity();
      this.paymentForm.get('mmyy').clearValidators();
      this.paymentForm.get('mmyy').updateValueAndValidity();
    } else if (type === 'TC'){
      this.type = 'TC';
      this.paymentForm.get('correlativo').clearValidators();
      this.paymentForm.get('correlativo').updateValueAndValidity();

      this.paymentForm.get('nameoncard').setValidators(Validators.required);
      this.paymentForm.get('nameoncard').updateValueAndValidity();
      this.paymentForm.get('cardnumber').setValidators(Validators.required);
      this.paymentForm.get('cardnumber').updateValueAndValidity();
      this.paymentForm.get('ccv').setValidators(Validators.required);
      this.paymentForm.get('ccv').updateValueAndValidity();
      this.paymentForm.get('mmyy').setValidators(Validators.required);
      this.paymentForm.get('mmyy').updateValueAndValidity();

    } else {
      this.paymentForm.get('correlativo').clearValidators();
      this.paymentForm.get('correlativo').updateValueAndValidity();
      this.paymentForm.get('nameoncard').clearValidators();
      this.paymentForm.get('nameoncard').updateValueAndValidity();
      this.paymentForm.get('cardnumber').clearValidators();
      this.paymentForm.get('cardnumber').updateValueAndValidity();
      this.paymentForm.get('ccv').clearValidators();
      this.paymentForm.get('ccv').updateValueAndValidity();
      this.paymentForm.get('mmyy').clearValidators();
      this.paymentForm.get('mmyy').updateValueAndValidity();

      this.type = '';
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.filterForm.invalid) {
      console.log(this.filterForm);
      return;
    }
    const findReservation = {
      date_arrival: formatDate(this.bsRangeValue[0], 'yyyy/MM/dd', 'en-US'),
      date_departure: formatDate(this.bsRangeValue[1], 'yyyy/MM/dd', 'en-US'),
      adults: this.filterForm.get('adults').value,
      childs: this.filterForm.get('childs').value,
      id_hostal: this.filterForm.get('hostal').value._id,
      affi_type: Number(this.filterForm.get('affi_type').value)
    }
    console.log(findReservation);

    this._hostalService.findReservation(findReservation).subscribe(data => {
      if (data.Capacity_Array.length > 0) {
        this.reservation = data.Capacity_Array;
        this.showRooms = true;
      } else {
        this.showError("NO SE ENCONTRO DISPONIBILIDAD");
        this.showRooms = false;
      }
      console.log(data);
    })
  }
}
