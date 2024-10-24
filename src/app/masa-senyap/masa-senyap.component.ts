import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';
import { MasaSenyapService } from 'src/shared/proxy/masasenyap/masasenyap.service';
import { MediaLibraryService } from 'src/shared/proxy/medialibrary/medialibrary.service';

@Component({
  selector: 'app-masa-senyap',
  templateUrl: './masa-senyap.component.html',
  styleUrls: ['./masa-senyap.component.css']
})
export class MasaSenyapComponent implements OnInit{

  periods: any = [
    {
      name: 'Subuh',
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
    },
    {
      name: 'Syuruq',
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
    },
    {
      name: 'Zohor',
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
    },
    {
      name: 'Jumaat',
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
    },
    {
      name: 'Asar',
      src: '../../assets/media/bg1.jpg',
      file: 'bg1',
      tillIqamah: 5,
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
  ];

  constructor(
    private route: Router,
    private masasenyapService: MasaSenyapService,
    private medialibraryService: MediaLibraryService,
  ){}

  ngOnInit(): void {
    this.masasenyapService.getall().subscribe((data: any) => {
      this.periods = data;

      this.medialibraryService.availableimages().subscribe((ml_data: any) => {
        this.available_images = ml_data.files;
        this.available_images.forEach(element => {
          element.src = element.src.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../');
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

  onDurationChange(event: any, index: number){
    this.periods[index].tillIqamah = +event.target.value;
  }

  updatemasasenyap(){
    this.periods.forEach((element: any) => {
      this.masasenyapService.update(element, element.id).subscribe((data:any) => {})
    });
  }

}
