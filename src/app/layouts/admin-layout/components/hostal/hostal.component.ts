import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ComponentsComponent } from 'src/app/pages/components/components/components.component';
import { HostalService } from 'src/app/services/hostal.service';
import { Hostal } from './hostal.model';


@Component({
  selector: 'app-hostal',
  templateUrl: './hostal.component.html',
  styleUrls: ['./hostal.component.scss']
})
export class HostalComponent implements OnInit {
  entries: number = 10;
  selected: any[] = [];
  activeRow: any;
  focus5;

  defaultModal: BsModalRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  confirmationModal: BsModalRef;
  confirmation = {
    keyboard: true,
    class: "modal-danger modal-dialog-centered"
  }

  updateModal: BsModalRef;
  update = {
    keyboard: true,
    class: "modal-dialog-centered"
  }

  submitted = false;
  newForm: FormGroup;
  updateForm: FormGroup;
  _hostal: string;

  selectedRow: Hostal;

  temp: Hostal[] = [];
  list: Hostal[] = [];


  columns: any =[
    { name: "Nombre Hostal" , prop: "name"},
    { name: "Descripción" , prop: "description"},
    { name: "Imagen" , prop: "pictures"},
    { name: "Precios" , prop: "price_list"},
    { name: "Capacidad Beneficios" , prop: "capacity_and_benefits"}
  ];

selectValue: string; 

constructor(private _hostalService: HostalService, private _modalService: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._hostalService.getHostal().subscribe(data => {
      console.log(data);
      console.log(this.list);
    });  

    this._hostalService.getHostal().subscribe(data => {
      this.list = data;
      this.temp = this.list;
      console.log(data);
      console.log(this.list);
    });    
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
