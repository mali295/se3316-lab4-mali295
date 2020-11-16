import { Component, OnInit } from '@angular/core';
import { SanitizeService } from '../_services/sanitize.service';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {

  input: any = {};
  error : string = '';
  courses: any = [];
  search: boolean = true;
  constructor(private sanitizer: SanitizeService, private http: HttpClient) { }

  ngOnInit() {
  }

  searchSubject(){
    if(
      this.input.subject.length === 0 || this.sanitizer.sanitizeSpaces(this.input.subject) || this.sanitizer.sanitizeInputChar(this.input.subject) ||
      this.input.course.length === 0 || this.sanitizer.sanitizeSpaces(this.input.course) || this.sanitizer.sanitizeInputChar(this.input.course)
      )
    {
      this.error = 'NOT A VALID INPUT!';
    } else {
      this.http.get<any[]>(api + 'timetable/' + this.input.subject + '/' + this.input.course)
      .subscribe(res=>{
        this.courses = res;
        this.search = false;
      }, error =>{
        this.error = 'Error: No Data Found with a Given Subject Code';
        this.search = true;
      })
    }
  }
}
