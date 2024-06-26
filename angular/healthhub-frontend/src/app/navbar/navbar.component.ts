import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isPatient = false;
  isDoctor = false;
  private userSub: Subscription;

  constructor(private router: Router,
              private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isPatient = !!user && user.roles.includes("ROLE_PATIENT");
      this.isDoctor = !!user && user.roles.includes("ROLE_DOCTOR");
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogoClick() {
    console.log('Image clicked!');

    this.router.navigate(['/auth']);
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
