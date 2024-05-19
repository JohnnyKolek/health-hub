import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegisterRequest} from "./register.request";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('f') signupForm: NgForm
  @Output() switchMode = new EventEmitter();

  registerRequest: RegisterRequest;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  onSubmit(){
    console.log(this.signupForm);
    this.registerRequest = new RegisterRequest(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.confirmedPassword,
      this.signupForm.value.name,
      this.signupForm.value.surname,
      this.signupForm.value.phone
    );
    console.log(this.registerRequest)

    this.authService.register(this.registerRequest)
      .subscribe((responseData) => console.log(responseData));

    this.signupForm.reset();
  }

  changeToLogin(){
    this.switchMode.emit();
  }

}
