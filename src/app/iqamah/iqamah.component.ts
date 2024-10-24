import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';
import { IqamahService } from 'src/shared/proxy/iqamah/iqamah.service';
import { MediaLibraryService } from 'src/shared/proxy/medialibrary/medialibrary.service';

@Component({
  selector: 'app-iqamah',
  templateUrl: './iqamah.component.html',
  styleUrls: ['./iqamah.component.css']
})
export class IqamahComponent implements OnInit {

  duration = 15;

  appsetting: any;

  periods: any = [
    {
      name: 'Subuh',
      checked: false,
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
      text: ''
    },
    {
      name: 'Syuruq',
      checked: false,
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
      text: ''
    },
    {
      name: 'Zohor',
      checked: false,
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
      text: ''
    },
    {
      name: 'Jumaat',
      checked: true,
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
      text: ''
    },
    {
      name: 'Asar',
      checked: false,
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
      text: ''
    },
  ];

  tillIqamah: any = [
    {
      value: 5,
      text: '5 minit',
    },
    {
      value: 6,
      text: '6 minit',
    },
    {
      value: 7,
      text: '7 minit',
    },
    {
      value: 8,
      text: '8 minit',
    },
    {
      value: 9,
      text: '9 minit',
    },
    {
      value: 10,
      text: '10 minit',
    },
    {
      value: 11,
      text: '11 minit',
    },
    {
      value: 12,
      text: '12 minit',
    },
    {
      value: 13,
      text: '13 minit',
    },
    {
      value: 14,
      text: '14 minit',
    },
    {
      value: 15,
      text: '15 minit',
    },
    {
      value: 16,
      text: '16 minit',
    },
    {
      value: 17,
      text: '17 minit',
    },
    {
      value: 18,
      text: '18 minit',
    },
    {
      value: 19,
      text: '19 minit',
    },
    {
      value: 20,
      text: '20 minit',
    },
  ];

  available_images = [
    {
      src:'../../assets/media/bg1.jpg',
      file: 'bg1'
    },
    {
      src:'../../assets/media/bg2.jpg',
      file: 'bg2'
    },
    {
      src:'../../assets/media/bg1.jpg',
      file: 'bg1'
    }
  ]

  constructor(
    private route: Router,
    private iqamahService: IqamahService,
    private medialibraryService: MediaLibraryService,
    private appsettingService: AppSettingService,
  ){}

  ngOnInit(): void {
      this.iqamahService.getall().subscribe((data: any) => {
        this.periods = data;

        this.medialibraryService.availableimages().subscribe((ml_data: any) => {
          this.available_images = ml_data.files;
          this.available_images.forEach(element => {
            element.src = element.src.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../');
          });

          this.appsettingService.get(1).subscribe((as_data: any) => {
            this.appsetting = as_data;
            this.duration = as_data.iqamahDuration;
          });
        });
      });
  }

  backToMenu(){
    this.route.navigate(['setting']);
  }

  selectedImage(index: number, src: string, file: string){
    this.periods[index].src = src;
    this.periods[index].file = file;
  }

  updateduration(){
    this.appsetting.iqamahDuration = this.duration;

    this.appsettingService.update(this.appsetting, 1).subscribe((data: any) => {
    })
  }

  onDurationChange(event: any, index: number){
    this.periods[index].tillIqamah = +event.target.value;
  }

  updateiqamah(){
    this.periods.forEach((element: any) => {
      this.iqamahService.update(element, element.id).subscribe((data:any) => {})
    });
  }

}
