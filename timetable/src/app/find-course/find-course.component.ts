import { Component, OnInit } from '@angular/core';
import { SanitizeService } from '../_services/sanitize.service';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-find-course',
  templateUrl: './find-course.component.html',
  styleUrls: ['./find-course.component.scss']
})
export class FindCourseComponent implements OnInit {

  searching : boolean = true;
  subjCode: string = '';
  error : string = '';
  courseCodes : any = [];
  constructor(private sanitizer: SanitizeService, private http : HttpClient) { }

  ngOnInit() {
  }

  getCourseCodes(){
    var input = this.subjCode;
    if(input.length === 0 || this.sanitizer.sanitizeSpaces(input) || this.sanitizer.sanitizeInputChar(input)){
      this.error = 'NOT A VALID INPUT!';
    } else {
      let url = api + 'timetable/' + input;
      console.log(url);
      this.http.get<any>(url)
      .subscribe(res=>{
        console.log(res);
        this.courseCodes = res;
        this.searching = false;
        if(this.courseCodes.length === 0){
          this.error = 'Error: No Data Found with a Given Subject Code';
          this.searching = true;
        }
      }, error =>{
        this.error = 'Error: No Data Found with a Given Subject Code';
        this.searching = true;
      })
    }
  }
}
