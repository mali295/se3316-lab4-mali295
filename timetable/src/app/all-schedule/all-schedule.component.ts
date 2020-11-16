import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-all-schedule',
  templateUrl: './all-schedule.component.html',
  styleUrls: ['./all-schedule.component.scss']
})
export class AllScheduleComponent implements OnInit {

  courses: any = {};
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.http.get(api + 'schedule/nameAndCourses')
      .subscribe(res=>{
        console.log(res);
        this.courses = res;
      }, error => {
        console.log(error);
      });
  }

}
