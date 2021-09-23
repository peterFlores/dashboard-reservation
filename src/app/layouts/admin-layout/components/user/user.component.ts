import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ComponentsComponent } from 'src/app/pages/components/components/components.component';
import { UserService } from 'src/app/services/user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

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


  selectedRow: User;

  temp: User[] = [];
  list: User[] = [];

  items: any = [
    { name: "Administrador", prop: "ADMINISTRADOR"},
    { name: "Operador", prop: "OPERADOR"},
    
  ];

  itemsmenu: any = [
    { name: "menu1", prop: ["menu"]},
    { name: "menu2", prop: ["menu"]},
  ];
  
  columns: any =[
    { name: "Primer Nombre", prop: "first_name"},
    { name: "Segudo Nombre", prop: "second_name"},
    { name: "Primer Apellido", prop: "last_name"},
    { name: "Segundo Apellido", prop: "slast_name"},
    { name: "Número Telefono", prop: "phone"},
    { name: "Correo", prop: "email"},
    { name: "DPI", prop: "dpi"},
    { name: "Dirección", prop: "address"},
    { name: "Tipo Usario", prop: "profile_type"}
  ];

  selectValue: string;
  selectMenu: string[];

  constructor(private _userService: UserService, private _modalService: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newForm = this.formBuilder.group({
      first_name: ['',  [Validators.required, Validators.maxLength(20)]],
      second_name: ['',  [Validators.required, Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.maxLength(20)]],
      slast_name: ['', [Validators.required, Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dpi: ['', [Validators.required , Validators.minLength(13)]],
      address: ['', [Validators.required]],
      profile_type: ['', [Validators.required]],
      menu: [[], [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]

    });

    this._userService.getUsers().subscribe(data => {
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

  openDeleteModal(modal: TemplateRef<any>, row: User) {
    this.selectedRow = row;
    this.confirmationModal = this._modalService.show(modal, this.confirmation);
  }

  openUpdateModal(modal: TemplateRef<any>, row: User) {
    this.selectedRow = row;
    this.updateForm = this.formBuilder.group({
      first_name: [row.first_name, [Validators.required, Validators.maxLength(20)]],
      second_name: [row.second_name, [Validators.required, Validators.maxLength(20)]],
      last_name: [row.last_name, [Validators.required, Validators.maxLength(20)]],
      slast_name: [row.slast_name, [Validators.required, Validators.maxLength(20)]],
      phone: [row.phone, [Validators.required, Validators.minLength(8)]],
      email: [row.email, [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      dpi: [row.dpi, [Validators.required , Validators.minLength(13)]],
      address: [row.address, [Validators.required]],
      profile_type: [row.address, [Validators.required]],
      menu: [row.menu, [Validators.required]],
      password: [row.password, [Validators.required, Validators.minLength(5)]]
      });
  
    this.updateModal = this._modalService.show(modal, this.update);
  }

  deleteUser(row: User) {
    this._userService.delete(row._id).subscribe(data => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  } 

  onSubmit() {
    this.submitted = true;
    this.newForm.get("profile_type").setValue(this.selectValue);
    this.newForm.get("menu").setValue(this.selectMenu);
    if (this.newForm.invalid) {
      console.log(this.newForm);
      return;
    }

    let json = this.newForm.getRawValue();
    console.log(this.newForm.getRawValue());
    this._userService.create(json).subscribe(data => {
      this.defaultModal.hide();
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }


  onUpdate() {
    this.submitted = true;
    this.updateForm.get("profile_type").setValue(this.selectValue);
    this.newForm.get("menu").setValue(this.selectMenu);
    if (this.updateForm.invalid) {
      console.log(this.updateForm);
      return;
    }

    let json = this.updateForm.getRawValue();
    this._userService.update(json, this.selectedRow._id).subscribe(data => {
      this.updateModal.hide();
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }


}
