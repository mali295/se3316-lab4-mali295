import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllScheduleComponent } from './all-schedule/all-schedule.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { DeleteAllComponent } from './delete-all/delete-all.component';
import { DeleteScheduleComponent } from './delete-schedule/delete-schedule.component';
import { FindCourseComponent } from './find-course/find-course.component';
import { FindSubjectCourseComponent } from './find-subject-course/find-subject-course.component';
import { LayoutComponent } from './layout/layout.component';
import { ScheduleAddRecordComponent } from './schedule-add-record/schedule-add-record.component';
import { SubjectComponent } from './subject/subject.component';


const routes: Routes = [
  { path:'', component: LayoutComponent },
  { path:'subjectAndDesc', component: SubjectComponent },
  { path:'findCourse', component: FindCourseComponent },
  { path:'findTimetableEntry', component: CourseSearchComponent },
  { path:'create', component: CreateScheduleComponent },
  { path:'scheduleAddRecords', component: ScheduleAddRecordComponent },
  { path:'findSubjectCourse', component: FindSubjectCourseComponent },
  { path:'findSchedulesCourses', component: AllScheduleComponent },
  { path:'delete', component: DeleteScheduleComponent },
  { path:'deleteAll', component: DeleteAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
