import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  @Input() doctor: any;
  days: Date[] = [];
  selectedDay: Date | null = null;

  constructor(private http: HttpClient) {
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

  selectDay(day: Date): void {
    this.selectedDay = day;
    this.http.get('http://localhost:8080/api/v1/visits/doctor/' + this.doctor.id)
      .subscribe(response => console.log("wizyty doktora: " + response))
  }

  isSelected(day: Date): boolean {
    return this.selectedDay === day;
  }

}
