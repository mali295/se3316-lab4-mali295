import { Component, OnInit } from '@angular/core';
import { SanitizeService } from '../_services/sanitize.service';
import data from 'src/json/scheduleData.json';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {

  creatingSchedule : boolean = true;
  schedule : string = '';
  error : string = '';
  scheduless : any = [];
  constructor(private sanitizer: SanitizeService, private http: HttpClient) { }

  ngOnInit() {
  }

  createSchedule(){
    if(this.schedule.length === 0 || this.sanitizer.sanitizeSpaces(this.schedule) || this.sanitizer.sanitizeInputChar(this.schedule))
    {
      this.error = 'NOT A VALID INPUT!';
    } 
    else 
    {
      this.http.post<any[]>(api + 'schedule/create', {scheduleName: this.schedule})
      .subscribe(res => {
        console.log(res);
        this.scheduless = res;
        this.creatingSchedule = false;
      }, err => {
        this.error = 'Error: Schedule Already Exists';
        this.creatingSchedule = true;
      })
    }
  }
}
