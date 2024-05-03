import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
}
