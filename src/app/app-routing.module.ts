import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseResolveService } from './services/course-resolve.service';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

const routes: Routes = [
  {path:"",component:AddCourseComponent},
  {path:"addcourse/:id",component:AddCourseComponent,
  resolve:{course:CourseResolveService}},
  //{path:"editcourse/:id",component:EditCourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
