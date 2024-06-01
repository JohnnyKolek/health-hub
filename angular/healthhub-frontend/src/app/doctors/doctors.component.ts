import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DoctorModel} from "./doctor.model";
import {exhaustMap, map, take} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: DoctorModel[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.http
      .get<DoctorModel[]>('http://localhost:8080/api/v1/users/doctors',
      )
      .subscribe((responseData: DoctorModel[]) => {
          this.doctors = responseData;
          console.log(responseData);
        }
      );

  }

}
