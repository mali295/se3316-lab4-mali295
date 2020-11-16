import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SubjectComponent } from './subject/subject.component';
import { FindCourseComponent } from './find-course/find-course.component';
import { FormsModule } from '@angular/forms';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleAddRecordComponent } from './schedule-add-record/schedule-add-record.component';
import { FindSubjectCourseComponent } from './find-subject-course/find-subject-course.component';
import { AllScheduleComponent } from './all-schedule/all-schedule.component';
import { DeleteScheduleComponent } from './delete-schedule/delete-schedule.component';
import { DeleteAllComponent } from './delete-all/delete-all.component';

@NgModule({
  declarations: [												
    AppComponent,
      LayoutComponent,
      SubjectComponent,
      FindCourseComponent,
      CourseSearchComponent,
      CreateScheduleComponent,
      ScheduleAddRecordComponent,
      FindSubjectCourseComponent,
      AllScheduleComponent,
      DeleteScheduleComponent,
      DeleteAllComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
