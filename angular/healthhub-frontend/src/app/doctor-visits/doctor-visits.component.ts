import {Component, OnInit} from '@angular/core';
import {DoctorModel} from "../doctors/doctor.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-doctor-visits',
  templateUrl: './doctor-visits.component.html',
  styleUrls: ['./doctor-visits.component.css']
})
export class DoctorVisitsComponent implements OnInit {
  currentDate: Date;
  doctorVisits;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.http
      .get('http://localhost:8080/api/v1/visits/doctor',
      )
      .subscribe((responseData) => {
          this.doctorVisits = responseData;
          console.log(responseData);
        }
      );

  }

  onPrevious(){
    const date = new Date(this.currentDate);
    date.setDate(date.getDate() - 1);
    this.currentDate = date;
  }
  onNext(){
    const date = new Date(this.currentDate);
    date.setDate(date.getDate() + 1);
    this.currentDate = date;
  }
  onToday(){
    this.currentDate = new Date();
  }



}
