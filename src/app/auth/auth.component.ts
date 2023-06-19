import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResposneData, AuthService } from './auth-service';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authFormGroup: FormGroup;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._initFormGroup();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private _initFormGroup() {
    this.authFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.authFormGroup.valid) return;

    let authObs: Observable<AuthResposneData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this._authService.login(
        this.authFormGroup.controls.email.value,
        this.authFormGroup.controls.password.value
      );
    } else {
      authObs = this._authService.signup(
        this.authFormGroup.controls.email.value,
        this.authFormGroup.controls.password.value
      );
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this._router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });
    this.authFormGroup.reset();
  }
}
