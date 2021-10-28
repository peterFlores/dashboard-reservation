import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ComponentsComponent } from 'src/app/pages/components/components/components.component';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from './menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
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

  selectedRow: Menu;

  temp: Menu[] = [];
  list: Menu[] =[];

  items: any = [
    { name: "Activo", prop: true},
    { name: "Desactivado", prop: false},
    
  ];

  columns: any = [
    { name: "Status", prop: "status"},
    { name: "Imagen", prop: "image"},
    { name: "Ruta", prop: "path"},
    { name: "Descripción", prop: "description"},
    { name: "Nombre Menu", prop: "name"},
  ];

  selectValue: string;

  constructor(private _menuService: MenuService, private _modalService: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newForm = this.formBuilder.group({
      status: ['', [Validators.required]],
      image: ['', [Validators.required]],
      path: ['', [Validators.required]],
      description: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });

    this._menuService.getMenus().subscribe(data => {
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
  openDeleteModal(modal: TemplateRef<any>, row: Menu) {
    this.selectedRow = row;
    this.confirmationModal = this._modalService.show(modal, this.confirmation);
  }


  openUpdateModal(modal: TemplateRef<any>, row: Menu) {
    this.selectedRow = row;
    this.updateForm = this.formBuilder.group({
      status: [row.status, [Validators.required]],
      image: [row.image, [Validators.required]],
      path: [row.path, [Validators.required]],
      description: [row.description, [Validators.required]],
      name: [row.name, [Validators.required]]
      });
  
    this.updateModal = this._modalService.show(modal, this.update);
  }

  deleteMenu(row: Menu) {
    this._menuService.delete(row._id).subscribe(data => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.newForm.get("status").setValue(this.selectValue);
    if (this.newForm.invalid) {
      console.log(this.newForm);
      return;
    }
    let json = this.newForm.getRawValue();
    console.log(this.newForm.getRawValue());
    this._menuService.create(json).subscribe(data => {
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
    this._menuService.update(json, this.selectedRow._id).subscribe(data => {
      this.updateModal.hide();
      console.log(data);
      this.ngOnInit();
    }, error => {
      console.log(error);
      
    });
  }

}
