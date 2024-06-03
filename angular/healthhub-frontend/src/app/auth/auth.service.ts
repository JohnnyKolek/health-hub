import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegisterRequest} from "./register/register.request";
import {Router} from "@angular/router";

interface AuthResponseData {
  accessToken: string,
  refreshToken: string,
  email: string,
  userId: number,
  expiresIn: string,
  roles: string[]
}


@Injectable({providedIn: "root"})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  register(request: RegisterRequest) {
    return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/register', request)
      .pipe(catchError((err) => this.handleError(err)),
        tap(resData => {
            this.handleAuthentication(resData.email, resData.userId, resData.accessToken, +resData.expiresIn, resData.roles);
          }
        ));
  }

  login(loginRequest: { email: string, password: string }) {
    return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/authenticate', loginRequest)
      .pipe(catchError((err) => this.handleError(err)),
        tap(resData => {
            this.handleAuthentication(resData.email, resData.userId, resData.accessToken, +resData.expiresIn, resData.roles);
          }
        ));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: number,
      _token: string,
      _tokenExpirationDate: string,
      roles: string[]
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.roles
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(this.logout, expirationDuration);
  }

  private handleAuthentication(email: string, userId: number, token: string, expiresIn: number, roles: string[]) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate,
      roles
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error)
  }

}
