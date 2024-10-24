import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaLibraryService } from 'src/shared/proxy/medialibrary/medialibrary.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  files = [
    {
      title: 'qeqwe',
      file: '../../assets/media/bg1.jpg',
    },
  ];

  fileToUpload: File | null = null;
  
  fileName: string = '';

  constructor(
    private route: Router,
    private medialibraryService: MediaLibraryService
  ){}


  ngOnInit(): void {
    this.medialibraryService.getall().subscribe((data: any) => {
      this.files = data.files;
      this.files.forEach(element => {
        element.file = element.file.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../')

        if(element.file.includes('.mp4')) element.file = '';
        if(element.file.includes('.mp3')) element.file = '';
        if(element.file.includes('.m4r')) element.file = '';
      })
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.target.files.item(0);
    this.fileName = files.target.files.item(0).name;
  }

  backToMenu(){
    this.route.navigate(['menu']);
  }

  uploadfile(){
    const formData = new FormData();

    if(this.fileToUpload) formData.append("file", this.fileToUpload);
    formData.append("title", this.fileName);

    this.medialibraryService.create(formData).subscribe((data: any) => {
      this.fileToUpload = null;
      this.fileName = '';
      if(data.status == 'success'){
        this.medialibraryService.getall().subscribe((data: any) => {
          this.files = data.files;
          this.files.forEach(element => {
            element.file = element.file.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../');
    
            if(element.file.includes('.mp4')) element.file = '';
            if(element.file.includes('.mp3')) element.file = '';
            if(element.file.includes('.m4r')) element.file = '';
          })
        });
      }
    })

  }
}
