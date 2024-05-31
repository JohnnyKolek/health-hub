import {Injectable} from "@angular/core";
import {catchError, BehaviorSubject, tap, throwError} from "rxjs";
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

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
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
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error)
  }

}
