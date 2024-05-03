import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import {RouterModule, Routes} from "@angular/router";
import { AuthComponent } from './auth/auth.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';

const appRoutes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'doctors', component: DoctorsComponent},
  {path: 'personalData', component: PersonalDataComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DoctorsComponent,
    DoctorComponent,
    AuthComponent,
    PersonalDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
