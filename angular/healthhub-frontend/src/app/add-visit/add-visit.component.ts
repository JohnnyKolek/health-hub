import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})
export class AddVisitComponent {
  @ViewChild('f') form: NgForm

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    console.log("Form submitted!");

    const request = {
      date: this.form.value.date,
      hour: this.form.value.hour
    }
    console.log(this.form.value);

    this.http.post<HttpResponse<any>>('http://localhost:8080/api/v1/visits', request, { observe: 'response' })
      .subscribe(response => {
        console.log('Response status:', response.status);
      });

    //this.form.reset();
  }
}
