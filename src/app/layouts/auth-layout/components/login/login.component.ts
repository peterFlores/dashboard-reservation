import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _alertService: AlertService,
    ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    const currentUser = this._authService.currentUserValue;
    this.returnUrl = '/dashboard/dashboard';

    if (currentUser) {
      if (currentUser.type_user === 'CLIENT') this.returnUrl = '/client/main';

      this.router.navigate([this.returnUrl]);
    }

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;


    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    var type = 'CLIENT';
    var email: string = this.f.email.value;
    if (email.includes("@hostales.com")) type = 'USER';
    console.log(this.f);
    this.loading = true;
    this._authService.login(email, this.f.password.value, type)
      .pipe(first())
      .subscribe(
        data => {  
          if (data) {
            
            if (type === 'CLIENT') this.returnUrl = '/client/main'
            this.router.navigate([this.returnUrl]);
          }                   
        },
        error => {
          this.loading = false;
          this.showError("AUTENTICACION FALLO VERIFIQUE SUS DATOS");
          console.log(error);
        });
  }
  
  showSuccess(message: string) {
    this._alertService.success(message, { autoClose: true, keepAfterRouteChange: false})
  }
  showError(message: string) {
    this._alertService.error(message, { autoClose: true, keepAfterRouteChange: true})
  }
}
