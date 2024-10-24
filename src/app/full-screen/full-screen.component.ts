import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';
import { BackgroundImageService } from 'src/shared/proxy/backgroundimage/backgroundimage.service';
import { MediaLibraryService } from 'src/shared/proxy/medialibrary/medialibrary.service';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {

  duration = 50;

  appsetting: any;

  currentImage: any;

  newImage: any =
  {
    file: '',
    src: '',
    order: 0,
    edit: false,
    isBackground: false
  };

  available_images = [
    {
      src:'../../assets/media/bg1.jpg',
      file: 'bg1'
    },
  ]

  images = [
    {
      id: 0,
      file:'bg1',
      src: '../../assets/media/bg1.jpg',
      order: 0,
      edit:false
    },
  ];

  constructor(
    private route: Router,
    private medialibraryService: MediaLibraryService,
    private backgroundimageService: BackgroundImageService,
    private appsettingService: AppSettingService,
  ){}

  sortArr(){
    this.images.sort((a,b) => {
      return a.order - b.order;
    });
  }

  ngOnInit(): void {
    this.medialibraryService.availableimages().subscribe((ml_data: any) => {
      this.available_images = ml_data.files;
      this.available_images.forEach(element => {
        element.src = element.src.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../');
      });

      this.backgroundimageService.getall_bi('false').subscribe((bi_data: any) => {
        this.images = bi_data;
        this.images.forEach(element => {
          element.src = element.src.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../');
        });

        this.sortArr();

        this.appsettingService.get(1).subscribe((as_data: any) => {
          this.appsetting = as_data;
          this.duration = as_data.fullscreenDuration;
        });
      });
    });
  }

  backToMenu(){
    this.route.navigate(['menu']);
  }

  editItem(index: number){
    this.images[index].edit = !this.images[index].edit;

    if(!this.images[index].edit && this.currentImage != this.images[index].file){
      this.backgroundimageService.update(this.images[index], this.images[index].id).subscribe((data: any) => {
        this.backgroundimageService.getall_bi('false').subscribe((bi_data: any) => {
          this.images = bi_data;

          this.sortArr();
        });
      });
    }
    else{
      this.currentImage = this.images[index].file;
    }
  }

  deleteItem(index: number){
    let id = this.images[index].id;
    this.backgroundimageService.delete(id).subscribe((data: any) => {
      this.backgroundimageService.getall_bi('false').subscribe((bi_data: any) => {
        this.images = bi_data;

        this.sortArr();
      });
    });
  }

  selectedImage(index: number, src: string, file: string){
    this.images[index].src = src;
    this.images[index].file = file;
  }

  selectedNewImage(src: string, file: string){
    let lastIndex = this.images.length + 1;
    this.newImage = 
    {
      file: file,
      src: src,
      order: lastIndex,
      edit: false,
      isBackground: false
    }
  }

  addNewImage(){
    this.backgroundimageService.create(this.newImage).subscribe((data: any) => {
      this.backgroundimageService.getall_bi('false').subscribe((bi_data: any) => {
        this.images = bi_data;

        this.sortArr();
        
        this.newImage = 
        {
          file: '',
          src: '',
          order: 0,
          edit: false,
          isBackground: false
        }
      });
    });
  }

  upSequence(index: number){
    const tempVal = this.images[index];
    const i = this.images.indexOf(tempVal);
    if (i > -1) { 
      this.images.splice(index, 1);
    }
    const newIndex = index - 1;
    this.images.splice(newIndex, 0, tempVal);

    this.updateSequence();
  }

  downSequence(index: number){
    const tempVal = this.images[index];
    const i = this.images.indexOf(tempVal);
    if (i > -1) { 
      this.images.splice(index, 1);
    }
    const newIndex = index + 1;
    this.images.splice(newIndex, 0, tempVal);

    this.updateSequence();
  }

  updateSequence(){
    this.images.forEach((elem, index) => {
      elem.order = index;
      this.backgroundimageService.update(elem, elem.id).subscribe((data: any) => {
        this.backgroundimageService.getall_bi('false').subscribe((bi_data: any) => {
          this.images = bi_data;
          
          this.sortArr();
        });
      })
    });
  }

  updateduration(){
    this.appsetting.fullscreenDuration = this.duration;

    this.appsettingService.update(this.appsetting, 1).subscribe((data: any) => {
    })
  }
}
