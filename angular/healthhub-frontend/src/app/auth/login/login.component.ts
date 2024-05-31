import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') loginForm: NgForm
  @Output() switchMode = new EventEmitter();
  error: string = null;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  changeToRegister() {
    this.switchMode.emit();
  }

  onSubmit() {
    console.log(this.loginForm);

    const loginRequest: { email: string, password: string } = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }

    this.authService.login(loginRequest)
      .subscribe((responseData) => {
          console.log(responseData);
          if (responseData.roles.includes('ROLE_DOCTOR')) {
            this.router.navigate(['/addVisit']);
          } else if (responseData.roles.includes("ROLE_PATIENT")) {
            this.router.navigate(['/doctors']);
          }
        },
        err => this.error = err.error
      );

    this.loginForm.reset();
  }

}
