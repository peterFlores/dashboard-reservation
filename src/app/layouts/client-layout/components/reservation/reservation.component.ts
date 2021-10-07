import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hostal } from "src/app/layouts/admin-layout/components/hostal/hostal.model";
import { HostalService } from "src/app/services/hostal.service";


// core components

@Component({
  selector: "app-reservation",
  templateUrl: "reservation.component.html",
  styleUrls: ["reservation.component.scss"]

})
export class ReservationComponent implements OnInit {
  filterForm: FormGroup;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  temp: Hostal[] = [];
  list: Hostal[] = [];
  submitted = false;

  constructor( private _formBuilder: FormBuilder, private _hostalService: HostalService) {
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

  public updateOptions() {
 
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
      id_hostal: this.filterForm.get('hostal').value,
      affi_type: Number(this.filterForm.get('affi_type').value)
    }
    console.log(findReservation);

    this._hostalService.findReservation(findReservation).subscribe(data => {
      console.log(data);
    })
  }
}
