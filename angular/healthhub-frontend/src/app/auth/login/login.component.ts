import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') loginForm: NgForm
  @Output() switchMode = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  changeToRegister() {
    this.switchMode.emit();
  }

  onSubmit() {
    console.log(this.loginForm);

    const loginRequest = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }

    this.http.post('http://localhost:8080/api/v1/auth/authenticate', loginRequest)
      .subscribe((responseData) => console.log(responseData));

    this.loginForm.reset();

  }

}
