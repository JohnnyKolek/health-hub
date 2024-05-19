import {Injectable} from "@angular/core";
import {catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "./register/register.request";

interface AuthResponseData {
  accessToken: string,
  refreshToken: string,
  email: string,
  userId: number,
  expiresIn: string
}


@Injectable({providedIn: "root"})
export class AuthService {
  user: Subject<User> = new Subject<User>()

  constructor(private http: HttpClient) {
  }

  register(request: RegisterRequest) {
    return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/register', request)
      .pipe(catchError(() => this.handleError()), tap(resData => {
          this.handleAuthentication(resData.email, resData.userId, resData.accessToken, +resData.expiresIn);
        }
      ));
  }

  login(loginRequest: { email: string, password: string }) {
    return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/authenticate', loginRequest)
      .pipe(catchError(() => this.handleError()), tap(resData => {
          this.handleAuthentication(resData.email, resData.userId, resData.accessToken, +resData.expiresIn);
        }
      ));
  }

  private handleAuthentication(email: string, userId: number, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  private handleError() {
    return throwError("An Unexpected Error occured!")
  }

}
