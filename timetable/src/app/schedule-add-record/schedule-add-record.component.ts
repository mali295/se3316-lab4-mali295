import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SanitizeService } from '../_services/sanitize.service';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-schedule-add-record',
  templateUrl: './schedule-add-record.component.html',
  styleUrls: ['./schedule-add-record.component.scss']
})
export class ScheduleAddRecordComponent implements OnInit {

  creatingSchedule : boolean = true;
  schedule : any = {};
  resList : any = [];
  resobj : any = [];
  error : string = '';

  constructor(private sanitizer: SanitizeService, private http: HttpClient) { }

  ngOnInit() {
  }
  saveRecord(){
    if(this.schedule.scheduleName === undefined) this.schedule.subject = ''
    if(this.schedule.subject === undefined) this.schedule.name = ''
    if(this.schedule.catalog_nbr === undefined) this.schedule.cataloge = ''
    if(
      this.schedule.scheduleName.length === 0 || this.sanitizer.sanitizeSpaces(this.schedule.scheduleName) || this.sanitizer.sanitizeInputChar(this.schedule.scheduleName) ||
      this.schedule.subject.length === 0 || this.sanitizer.sanitizeSpaces(this.schedule.subject) || this.sanitizer.sanitizeInputChar(this.schedule.subject)
      )
    {
      console.log(this.schedule)
      this.error = 'NOT A VALID INPUT!';
    } else {
      this.http.post(api + 'schedule/saveScheduleInfo', this.schedule)
      .subscribe(res=>{
        if(Array.isArray(res)){
          this.resList = res;
        }
        else{
          this.resobj = res;
        }
        console.log(res);
        this.creatingSchedule = false;
      }, error =>{
        this.error = "Error: Schedule Name doesn't Exists!";
        this.creatingSchedule = true;
      })
    }
  }
}
