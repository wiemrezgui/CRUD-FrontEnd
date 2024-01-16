import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { FileHandle } from 'src/app/models/file-handle.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { TasktwoService } from 'src/app/services/tasktwo.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
  addForm ! : FormGroup
  courses: Course[] = []
  //new
  course: Course = {
    id: '',
    name: '',
    price: 0,
    courseImages: []
  };
  id:any
  constructor(private taskservice: TasktwoService, private httpClient: HttpClient, private sanitizer:DomSanitizer,private activatedroute:ActivatedRoute,
    private imgservice:ImageProcessingService) { 
  }
  ngOnInit():void{
    this.id=this.activatedroute.snapshot.paramMap.get('id')
    this.getCourseById(this.id)   
    this.receiveImages()
 
  }
  getCourseById(id:any){
    this.taskservice.getCourseById(id)
    .subscribe(
      (response: Course) => {
        this.course=response
        console.log(this.course)
      }
    );
  }
  public onFileChanged(event: any) {
    //this.selectedFile = event.target.files[0];
   if (event.target.files){
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        };
        this.course.courseImages.push(fileHandle);
      }
    }}
    
  }
  editCourse(){
    this.taskservice.updateCourse(this.course).subscribe(
      (response: Course) => {
        console.log(response)
      }
    )
  }
  getAllCourses() {
    this.taskservice.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
        console.log(this.courses)
      }
    );
  }
  removeImages(i:number){
    this.course.courseImages.splice(i,1)
    }
    receiveImages(){
     // console.log(this.data);
      
    }
}
