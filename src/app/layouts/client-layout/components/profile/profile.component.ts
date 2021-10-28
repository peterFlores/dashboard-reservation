import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/layouts/admin-layout/components/client/client.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  submitted = false;
  client: Client;
  user = '';
  show = false;
  id = '';
  clientForm: FormGroup;
  constructor(private _authService: AuthService, private _alertService: AlertService,
    private _clientService: ClientService, private form: FormBuilder) { }

  ngOnInit() {
    this.user = this._authService.currentUserValue.userName;
    this.id = this._authService.currentUserValue.userId;
    this._clientService.getClient(this.id).subscribe(data => {
      this.client = data;
      console.log(this.client);
      this.clientForm = this.form.group({
        email: [this.client.email, [Validators.required]],
        first_name: [this.client.first_name, [Validators.required]],
        second_name: [this.client.second_name],
        last_name: [this.client.last_name, [Validators.required]],
        slast_name: [this.client.slast_name],
        phone: [this.client.phone, [Validators.required]],
        dpi: [this.client.dpi, [Validators.required]],
        affiliate: [this.client.affiliate],
        address: [this.client.address, [Validators.required]]
      });
      this.show = true;
    });
    
  }

  get f() { return this.clientForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.clientForm.invalid) {
      return;
    }
    this.client.first_name = this.f.first_name.value || "";
    this.client.second_name = this.f.second_name.value || "";
    this.client.last_name = this.f.last_name.value || "";
    this.client.slast_name = this.f.slast_name.value || "";
    this.client.address = this.f.address.value || "";
    this.client.affiliate = this.f.affiliate.value || "";
    this.client.phone = this.f.phone.value || "";
    
    this._clientService.update(this.client, this.id).subscribe(data => {
      console.log(data);
      this.showSuccess("ACTUALIZACION EXITOSA");
      this.ngOnInit();
    });
  }
  showSuccess(message: string) {
    this._alertService.success(message, { autoClose: true, keepAfterRouteChange: false})
  }
  showError(message: string) {
    this._alertService.error(message, { autoClose: true, keepAfterRouteChange: true})
  }
}
