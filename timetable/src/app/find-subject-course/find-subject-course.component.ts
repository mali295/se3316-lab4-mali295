import { Component, OnInit } from '@angular/core';
import { SanitizeService } from '../_services/sanitize.service';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-find-subject-course',
  templateUrl: './find-subject-course.component.html',
  styleUrls: ['./find-subject-course.component.scss']
})
export class FindSubjectCourseComponent implements OnInit {

  searching : boolean = true;
  scheduleName: string = '';
  error : string = '';
  res : any = [];

  constructor(private sanitizer: SanitizeService, private http : HttpClient) { }

  ngOnInit() {
  }
  
  findSubCourseList(){
    var input = this.scheduleName;
    if(input.length === 0 || this.sanitizer.sanitizeSpaces(input) || this.sanitizer.sanitizeInputChar(input)){
      this.error = 'NOT A VALID INPUT!';
    } else {
      this.http.get(api + 'schedule/listSubjectCourse/' + input)
      .subscribe(res=>{
        this.res = res;
        console.log(res);
        if(this.res.scheduleName === undefined){
          this.error = 'Error: Schedule Name doesn\'t Exists!' ;
          this.searching = true;
        }
        else{
          this.searching = false
        }
      }, error =>{
        this.error = 'Error: Schedule Name doesn\'t Exists!' ;
          this.searching = true;
      })
    }
  }
}
