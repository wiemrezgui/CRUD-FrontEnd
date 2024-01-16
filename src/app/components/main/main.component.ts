import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { TasktwoService } from 'src/app/services/tasktwo.service';
import { ShowImagesDialogComponent } from '../show-images-dialog/show-images-dialog.component';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  courses: Course[] = [];
  constructor(private route:Router,private taskservice:TasktwoService,public dialog: MatDialog,
    private imgservice:ImageProcessingService){}
  ngOnInit(){
    this.getAllCourses()
  }
  Edit(id:any){
    this.route.navigate(['/addcourse/'+id])
    }
    getAllCourses() {
      this.taskservice.getAllCourses()
      .pipe(
        map((c:Course[],i)=>c.map((course:Course)=> this.imgservice.createImages(course)))
      )
      .subscribe(
        (response: Course[]) => {
          this.courses = response;  
        }
      );
    }
    
    deleteCourse(id:any): void {
      this.taskservice.deleteCourse(Number(id)).subscribe(
        (response: void) => {
          this.getAllCourses();
        }
  
      );
    }
    showImages(course:Course){
      console.log(course);
      this.dialog.open(ShowImagesDialogComponent,{
       data:{
        images:course.courseImages
       },
        height:'500px',width:'800px'
      })
      
    }
}
