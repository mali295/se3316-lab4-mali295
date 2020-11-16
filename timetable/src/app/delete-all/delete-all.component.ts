import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';
import { SanitizeService } from '../_services/sanitize.service';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent implements OnInit {

  isSuccess : boolean = false;
  constructor(private sanitizer: SanitizeService, private http : HttpClient) { }

  ngOnInit() {
  }

  deleteAllSchedule(){
    this.http.get(api + 'schedule/deleteAll')
      .subscribe(() => {
        this.isSuccess = true;
      }, error =>{
        this.isSuccess = false;
      })
  }
}
