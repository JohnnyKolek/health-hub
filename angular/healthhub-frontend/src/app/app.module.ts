import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DoctorsComponent} from './doctors/doctors.component';
import {DoctorComponent} from './doctors/doctor/doctor.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from './auth/auth.component';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {RegisterComponent} from './auth/register/register.component';
import {NgOptimizedImage} from "@angular/common";
import {LoginComponent} from './auth/login/login.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AddVisitComponent} from './add-visit/add-visit.component';
import {DoctorVisitsComponent} from './doctor-visits/doctor-visits.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AuthGuard} from "./auth/auth.guard";

const appRoutes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard]},
  {path: 'personalData', component: PersonalDataComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: 'addVisit', component: AddVisitComponent, canActivate: [AuthGuard]},
  {path: 'doctorVisits', component: DoctorVisitsComponent, canActivate: [AuthGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DoctorsComponent,
    DoctorComponent,
    AuthComponent,
    PersonalDataComponent,
    RegisterComponent,
    LoginComponent,
    AddVisitComponent,
    DoctorVisitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgOptimizedImage,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
