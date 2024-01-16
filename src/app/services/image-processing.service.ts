import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { FileHandle } from '../models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor( private sanitizer:DomSanitizer) { }
  public createImages(course:Course){
    const courseImg:any[]=course.courseImages;
    const courseImgToFileHandle: FileHandle[]=[];
    for (let i = 0; i < courseImg.length; i++) {
      const imageFileData=courseImg[i];
      const imageBlob=this.dataURLtoBlob(imageFileData.picByte,imageFileData.type)
    const imageFile=new File([imageBlob],imageFileData.name,{type: imageFileData.type})
  const finalFileHandle:FileHandle  ={
    file:imageFile,
    url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
  };
  courseImgToFileHandle.push(finalFileHandle)
  }
  course.courseImages=courseImgToFileHandle;
  return course;
  }
  public dataURLtoBlob(picBytes:any,imagesType:any){
    const byteString=window.atob(picBytes)
    const arrayBuffer=new ArrayBuffer(byteString.length);
    const int8Array=new Uint8Array(arrayBuffer);
    for (let index = 0; index < byteString.length; index++) {
      int8Array[index]=byteString.charCodeAt(index);
    }
   const blob= new Blob([int8Array],{type:imagesType});
   return blob;
  }
}
