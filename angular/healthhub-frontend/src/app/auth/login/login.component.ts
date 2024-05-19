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
        this.router.navigate(['/doctors']);
      });

    this.loginForm.reset();
  }

}
