import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResposneData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
const API_KEY = 'AIzaSyC4s7jTWb5JxpKDZRKl5bC0nySODwbWJLs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private _tokenTimer: any;

  constructor(private _http: HttpClient, private _router: Router) {}

  signup(email: string, password: string) {
    return this._http
      .post<AuthResposneData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError((errorRes) => this._handleError(errorRes)));
  }

  logout() {
    this.user.next(null);
    this._router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this._tokenTimer) {
      clearTimeout(this._tokenTimer);
    }
    this._tokenTimer = null;
  }

  login(email: string, password: string) {
    return this._http
      .post<AuthResposneData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => this._handleError(errorRes)),
        tap((resData) =>
          this._handleAuth(
            resData.email,
            +resData.expiresIn,
            resData.localId,
            resData.idToken
          )
        )
      );
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this._tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private _handleAuth(
    email: string,
    expiresIn: number,
    localId: string,
    idToken: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private _handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error accurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
