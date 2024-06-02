import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

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
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();


    let dayString: string = day < 10 ? '0' + day : day.toString();
    let monthString: string = month < 10 ? '0' + month : month.toString();

    this.http
      .get('http://localhost:8080/api/v1/visits/doctor',{params: new HttpParams().set("date", `${year}-${monthString}-${dayString}`)}
      )
      .subscribe((responseData) => {
          this.doctorVisits = responseData;
          console.log(responseData);
        }
      );
  }
  onNext(){
    const date = new Date(this.currentDate);
    date.setDate(date.getDate() + 1);
    this.currentDate = date;
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();


    let dayString: string = day < 10 ? '0' + day : day.toString();
    let monthString: string = month < 10 ? '0' + month : month.toString();

    this.http
      .get('http://localhost:8080/api/v1/visits/doctor',{params: new HttpParams().set("date", `${year}-${monthString}-${dayString}`)}
      )
      .subscribe((responseData) => {
          this.doctorVisits = responseData;
          console.log(responseData);
        }
      );
  }
  onToday(){
    this.currentDate = new Date();
    let day: number = this.currentDate.getDate();
    let month: number = this.currentDate.getMonth() + 1;
    let year: number = this.currentDate.getFullYear();


    let dayString: string = day < 10 ? '0' + day : day.toString();
    let monthString: string = month < 10 ? '0' + month : month.toString();

    this.http
      .get('http://localhost:8080/api/v1/visits/doctor',{params: new HttpParams().set("date", `${year}-${monthString}-${dayString}`)}
      )
      .subscribe((responseData) => {
          this.doctorVisits = responseData;
          console.log(responseData);
        }
      );
  }

  onComplete(visit){
    this.http.put('http://localhost:8080/api/v1/visits/completed/' + visit.id, null, { observe: 'response' })
      .subscribe(r => this.http
      .get('http://localhost:8080/api/v1/visits/doctor'
      )
      .subscribe((responseData) => {
          this.doctorVisits = responseData;
          console.log(responseData);
        }
      ));


  }



}
