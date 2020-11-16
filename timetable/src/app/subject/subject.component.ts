import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subjects: any = [];
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(api + 'timetable/subjectAndDesc')
      .subscribe(res=>{
        this.subjects = res;
      }, error => {
        console.log(error);
      });
  }

}
