import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  focus;
  focus1;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  items: any = [
    { name: "Nacional", prop: "NACIONAL"},
    { name: "Extranjero", prop: "EXTRANJERO"},
    
  ];
  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _alertService: AlertService,
    private _clientService: ClientService
    ) {}
    selectValue: string;

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      second_name: [''],
      last_name: ['', [Validators.required]],
      slast_name: [''],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      dpi: ['', [Validators.required, Validators.pattern("^[0-9]{13}$")]],
      address: ['', [Validators.required]],
      client_type: ['', [Validators.required]],
      affiliate: [''],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    const currentUser = this._authService.currentUserValue;
    this.returnUrl = '/auth/login';

    if (currentUser) {
      if (currentUser.type_user === 'CLIENT') this.returnUrl = '/client/main';

      this.router.navigate([this.returnUrl]);
    }

  }
  get a() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.registerForm.get("client_type").setValue(this.selectValue);
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      return;
    }

    let json = this.registerForm.getRawValue();
    console.log(this.registerForm.getRawValue());
    this._clientService.create(json).subscribe(data => {
      this.showSuccess("REGISTRO EXITOSO!");
      this.router.navigate([this.returnUrl]);
    }, error => {
      console.log(error);
      this.showError("HUBO UN ERROR INTENTE DE NUEVO");
    });
  }
  
  showSuccess(message: string) {
    this._alertService.success(message, { autoClose: true, keepAfterRouteChange: true})
  }
  showError(message: string) {
    this._alertService.error(message, { autoClose: true, keepAfterRouteChange: true})
  }
}
