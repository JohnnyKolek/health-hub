import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegisterRequest} from "./register.request";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('f') signupForm: NgForm
  @Output() switchMode = new EventEmitter();

  user: RegisterRequest;

  constructor(private http: HttpClient) {

  }


  onSubmit(){
    console.log(this.signupForm);
    this.user = new RegisterRequest(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.confirmedPassword,
      this.signupForm.value.name,
      this.signupForm.value.surname,
      this.signupForm.value.phone
    );
    console.log(this.user)

    this.http.post('http://localhost:8080/api/v1/auth/register', this.user)
      .subscribe((responseData) => console.log(responseData));

    this.signupForm.reset();
  }

  changeToLogin(){
    this.switchMode.emit();
  }

}
