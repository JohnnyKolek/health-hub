import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";
import {exhaustMap, take} from "rxjs";
import {DoctorModel} from "../doctors/doctor.model";

interface Visit {
  "id": number,
  "doctor": string,
  "patient": string,
  "dateTime": Date,
  "completed": boolean
}

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  patient: DoctorModel = null;
  visits: Visit[];

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user.pipe(take(1), exhaustMap(user => {
        return this.http.get<DoctorModel>('http://localhost:8080/api/v1/users', {params: new HttpParams().set("id", user.id)})
      }
    ))
      .subscribe((res: DoctorModel) => this.patient = res);


    this.http.get<Visit[]>('http://localhost:8080/api/v1/visits/patient')
      .subscribe(response => {
        this.visits = response
      });

  }


}
