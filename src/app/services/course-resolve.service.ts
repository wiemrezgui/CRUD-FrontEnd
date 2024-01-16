import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { TasktwoService } from './tasktwo.service';
import { Course } from '../models/course.model';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolveService implements Resolve<Course> {

  constructor(private taskservice: TasktwoService,private imgservice:ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    const id = route.paramMap.get("id");

    if (id) {
      // Fetch course details from the backend
      let idc = Number(id);
      return this.taskservice.getCourseById(idc).pipe(map(p=>this.imgservice.createImages(p))
      );
    } else {
      // Return empty course observable.
      return of(this.getCourseDetails());
    }
  }

  getCourseDetails(): Course {
    return {
      id: '',
      name: '',
      price: 0,
      courseImages: []
    };
  }
}
