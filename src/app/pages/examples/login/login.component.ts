import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder,
    ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

  }
}
