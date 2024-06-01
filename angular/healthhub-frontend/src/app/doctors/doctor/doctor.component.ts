import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

interface Visit {
  "id": number,
  "doctor": string,
  "patient": string,
  "dateTime": Date,
  "completed": boolean
}


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  @Input() doctor: any;
  days: Date[] = [];
  selectedDay: Date | null = null;
  visits: Visit[];
  selectedVisit: Visit | null = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.generateDates();
  }

  generateDates(): void {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      this.days.push(nextDate);
    }
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }

  getMonthName(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  }

  selectDay(date: Date): void {
    this.selectedDay = date;
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();


    let dayString: string = day < 10 ? '0' + day : day.toString();
    let monthString: string = month < 10 ? '0' + month : month.toString();

    this.http.get<Visit[]>('http://localhost:8080/api/v1/visits/doctor/' + this.doctor.id,
      {params: new HttpParams().set('date', `${year}-${monthString}-${dayString}`)})
      .subscribe(response => {
        this.visits = response
      })
  }

  onSelect(selected: Visit){
    this.selectedVisit = selected;
  }

  isSelected(day: Date): boolean {
    return this.selectedDay === day;
  }
  isSelectedVisit(visit: Visit): boolean {
    return this.selectedVisit === visit;
  }

  onSubmit(){
    console.log(this.selectedVisit);
    this.http.put('http://localhost:8080/api/v1/visits/' + this.selectedVisit.id, null, { observe: 'response' })
      .subscribe(r => this.router.navigate(["/personalData"]), r => console.log(r.status));

  }

}
