import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ComponentsComponent } from 'src/app/pages/components/components/components.component';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from './client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

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
  _user: string;

  selectedRow: Client;

  temp: Client[] = [];
  list: Client[] =[];
  items: any = [
    { name: "Nacional", prop: "NACIONAL"},
    { name: "Extranjero", prop: "EXTRANJERO"},
    
  ];

  columns: any = [
    { name: "Primer nombre", prop: "first_name"},
    { name: "Segundo nombre", prop: "second_name"},
    { name: "Primer Apellido", prop: "last_name"},
    { name: "Tercer Apellido", prop: "slast_name"},
    { name: "Teléfono", prop: "phone"},
    { name: "DPI", prop: "dpi"},
    { name: "Dirección", prop: "address"},
    { name: "Tipo de cliente", prop: "client_type"},
    { name: "Afiliado", prop: "affiliate"}
    
  ];

  selectValue: string;

  constructor(private _clientService: ClientService, private _alertService: AlertService,
    private _modalService: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      second_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      slast_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      address: ['', [Validators.required]],
      client_type: [''],
      affiliate: [''],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this._clientService.getClients().subscribe(data => {
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
  
  get a() { return this.newForm.controls; }
  get b() { return this.updateForm.controls; }


  openDefaultModal(modalDefault: TemplateRef<any>) {
    this.newForm.reset();
    this.defaultModal = this._modalService.show(modalDefault, this.default);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  openDeleteModal(modal: TemplateRef<any>, row: Client) {
    this.selectedRow = row;
    this.confirmationModal = this._modalService.show(modal, this.confirmation);
  }

  
  openUpdateModal(modal: TemplateRef<any>, row: Client) {
    this.selectedRow = row;
    this.updateForm = this.formBuilder.group({
      first_name: [row.first_name, [Validators.required, Validators.maxLength(20)]],
      second_name: [row.second_name, [Validators.required, Validators.maxLength(20)]],
      last_name: [row.last_name, [Validators.required, Validators.maxLength(20)]],
      slast_name: [row.slast_name, [Validators.required, Validators.maxLength(20)]],
      phone: [row.phone, [Validators.required, Validators.minLength(8)]],
      dpi: [row.dpi, [Validators.required , Validators.minLength(13)]],
      address: [row.address, [Validators.required]],
      client_type: [row.client_type],
      affiliate: [row.affiliate],
      email: [row.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [row.password, [Validators.required, Validators.minLength(5)]]
    });
  
    this.updateModal = this._modalService.show(modal, this.update);
  }

  deleteClient(row: Client) {
    this._clientService.delete(row._id).subscribe(data => {
      this.confirmationModal.hide();
      this.showSuccess("EXITO");
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.newForm.get("client_type").setValue(this.selectValue);
    if (this.newForm.invalid) {
      console.log(this.newForm);
      return;
    }

    let json = this.newForm.getRawValue();
    console.log(this.newForm.getRawValue());
    this._clientService.create(json).subscribe(data => {
      this.defaultModal.hide();
      this.showSuccess("EXITO");
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }

  onUpdate() {
    this.submitted = true;
    this.updateForm.get("client_type").setValue(this.selectValue);
    if (this.updateForm.invalid) {
      console.log(this.updateForm);
      return;
    }

    let json = this.updateForm.getRawValue();
    this._clientService.update(json, this.selectedRow._id).subscribe(data => {
      this.updateModal.hide();
      this.showSuccess("EXITO");
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }

  showSuccess(message: string) {
    this._alertService.success(message, { autoClose: true, keepAfterRouteChange: true})
  }
  showError(message: string) {
    this._alertService.error(message, { autoClose: true, keepAfterRouteChange: true})
  }

}
