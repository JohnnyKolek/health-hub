import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DoctorModel} from "./doctor.model";
import {map} from "rxjs";

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
    this.http.get<DoctorModel[]>('http://localhost:8080/api/v1/doctors')
      .subscribe(responseData => {
            this.doctors = responseData;
          console.log(responseData);
        }
      );

  }

}
