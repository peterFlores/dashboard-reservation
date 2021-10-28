import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { ComponentsComponent } from 'src/app/pages/components/components/components.component';
import { HostalService } from 'src/app/services/hostal.service';
import { AffiBenefit, CapacityAndBenefit, Hostal, PriceList } from './hostal.model';


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
    hostal: Hostal;
  picturePath: string;

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

  propertiesModal: BsModalRef;
  properties = {
    class: "modal-content"
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
    { name: "Descripción" , prop: "description"}
  ];

  prices: PriceList[];

  capacities: Array<string>;

  benefits: CapacityAndBenefit[];

  pictures: Array<string>;

  picturesCreate: Array<string>;
  

selectValue: string; 

constructor(private _hostalService: HostalService, private _modalService: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.newForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      pictures: [''],
      price_list: [''],
      capacity_and_benefits: ['']
    });  

    this._hostalService.getHostal().subscribe(data => {
      this.list = data;
      this.temp = this.list;
      console.log(data);
      console.log(this.list);
    }); 
  }

  getServices(id: any): void {
    
    this._hostalService.getHostalById(id).subscribe(data => {
      this.hostal = data;
      this.picturePath = data?.pictures[0];
      console.log(this.hostal);
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

  get a() { return this.newForm.controls; }
  get b() { return this.updateForm.controls; }

  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.newForm.reset();
    this.defaultModal = this._modalService.show(modalDefault, this.default);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  openDeleteModal(modal: TemplateRef<any>, row: Hostal) {
    this.selectedRow = row;
    this.confirmationModal = this._modalService.show(modal, this.confirmation);
  }


  openUpdateModal(modal: TemplateRef<any>, row: Hostal) {
    this.selectedRow = row;
    this.updateForm = this.formBuilder.group({
    name: [row.name, [Validators.required]],
    description: [row.description, [Validators.required]], 
    pictures: [row.pictures, [Validators.required]],
    price_list: [row.price_list, [Validators.required]],
    capacity_and_benefits: [row.capacity_and_benefits, [Validators.required]] 
    });
  
    this.updateModal = this._modalService.show(modal, this.update);
  }

  deleteHostal(row: Hostal) {
    this._hostalService.delete(row._id).subscribe(data => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.newForm.invalid) {
      console.log(this.newForm);
      return;
    }

    this.newForm.get('pictures').setValue([]);
    this.newForm.get('price_list').setValue([]);
    this.newForm.get('capacity_and_benefits').setValue([]);


    let json = this.newForm.getRawValue();
    console.log(this.newForm.getRawValue());
      this._hostalService.create(json).subscribe(data => {
      this.defaultModal.hide();
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }


  onUpdate() {
    this.submitted = true;
    this.newForm.get("status").setValue(this.selectValue);
    if (this.updateForm.invalid) {
      console.log(this.updateForm);
      return;
    }

    let json = this.updateForm.getRawValue();
    this._hostalService.update(json, this.selectedRow._id).subscribe(data => {
      this.updateModal.hide();
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }

  openPropertiesModal(modal: TemplateRef<any>, row: Hostal) {
    this.selectedRow = row;
    this.propertiesModal = this._modalService.show(modal, this.properties);
    this._hostalService.getHostalById(row._id).subscribe(data => {
      this.hostal = data;
      this.picturePath = data?.pictures[0];
      console.log(this.hostal);
    });

  


    const pictures: Array<string> =  Object.values(row.pictures).map(value => {
      console.log(value)
      return value;
    });
    this.pictures = pictures;

    const prices: PriceList[] =  Object.values(row.price_list).map(value => {
      console.log(value)
      return value;
    });
    this.prices = prices;

    const benefits: CapacityAndBenefit[] =  Object.values(row.capacity_and_benefits).map(value => {
      console.log(value)
    const  capacities = value.capacity;
      return value;
    });
    this.benefits = benefits;

}

}
