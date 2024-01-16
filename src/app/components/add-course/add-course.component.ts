import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { FileHandle } from 'src/app/models/file-handle.model';
import { TasktwoService } from 'src/app/services/tasktwo.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  title:string='Add Course'
  isNew=true
  addForm ! : FormGroup
  courses: Course[] = []
  //new
  course: Course = {
    id:'',
    name: '',
    price: 0,
    courseImages: []
  };
  
  constructor(private taskservice: TasktwoService, private httpClient: HttpClient, private sanitizer:DomSanitizer,private activatedroute:ActivatedRoute,
    private route:Router) { 
  }
 ngOnInit():void{
  const resolvedCourse = this.activatedroute.snapshot.data['course'];
  if (resolvedCourse && resolvedCourse.id !='') {
    this.course = resolvedCourse;
    this.isNew=false
    this.title='Edit Course'
  } 
}
  public onFileChanged(event: any) {
    //this.selectedFile = event.target.files[0];
   if (event.target.files){
    const file=event.target.files[0];
    const fileHandle:FileHandle={
      file:file,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
    }
    this.course.courseImages.push(fileHandle)
   }
    
  }
  getAllCourses() {
    this.taskservice.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
        console.log(this.courses)
      }
    );
  }
  addCourse(){
    console.log(this.course)
    const productFormData=this.prepareFormData(this.course)
    this.taskservice.addCourse(productFormData).subscribe(
     (response: Course) => {
        console.log(response);
        this.getAllCourses();
        this.route.navigate([''])

      }
   );

  }
  prepareFormData(course: Course): FormData {    
    const formData = new FormData();
    formData.append('course', new Blob([JSON.stringify(course)], { type: 'application/json' }));
    
    for (let i = 0; i < course.courseImages.length; i++) {
        formData.append('file', course.courseImages[i].file, course.courseImages[i].file.name);
    }
    
    return formData;
}
removeImages(i:number){
this.course.courseImages.splice(i,1)
}
}
