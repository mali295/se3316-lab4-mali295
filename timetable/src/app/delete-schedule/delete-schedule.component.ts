import { Component, OnInit } from '@angular/core';
import { SanitizeService } from '../_services/sanitize.service';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.scss']
})
export class DeleteScheduleComponent implements OnInit {

  searching : boolean = true;
  scheduleName: string = '';
  error : string = '';
  schedules : any = [];
  isSuccess : boolean = false;
  constructor(private sanitizer: SanitizeService, private http : HttpClient) { }

  ngOnInit() {
  }

  deleteSchedule(){
    var input = this.scheduleName;
    if(input.length === 0 || this.sanitizer.sanitizeSpaces(input) || this.sanitizer.sanitizeInputChar(input)){
      this.error = 'NOT A VALID INPUT!';
    } else {
      this.http.get(api + 'schedule/delete/' + input)
      .subscribe(res=>{
        console.log(res);
        this.schedules = res;
        this.searching = false;
        this.isSuccess = true;

      }, error =>{
        this.error = 'Error: No Data Found with a Given Subject Code';
          this.searching = true;
          this.isSuccess = false;
      })
    }
  }
}
