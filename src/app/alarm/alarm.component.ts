import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmService } from 'src/shared/proxy/alarm/alarm.service';
import { MediaLibraryService } from 'src/shared/proxy/medialibrary/medialibrary.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  selectedAdzan = true;

  adzan_periods: any = [
    {
      name: 'Subuh',
      file: 'videoplayback',
    },
    {
      name: 'Syuruq',
      file: 'videoplayback',
    },
    {
      name: 'Zohor',
      file: 'videoplayback',
    },
    {
      name: 'Jumaat',
      file: 'videoplayback',
    },
    {
      name: 'Asar',
      file: 'videoplayback',
    },
  ];

  iqamah_periods: any = [
    {
      name: 'Subuh',
      file: 'iqamahplayback',
    },
    {
      name: 'Syuruq',
      file: 'iqamahplayback',
    },
    {
      name: 'Zohor',
      file: 'iqamahplayback',
    },
    {
      name: 'Jumaat',
      file: 'iqamahplayback',
    },
    {
      name: 'Asar',
      file: 'iqamahplayback',
    },
  ];

  alarms: any = [
    {
      file: 'videoplayback',
      src: '../../assets/media/videoplayback.mp4',
    },
    {
      file: 'iqamahplayback',
      src: '../../assets/media/videoplayback.mp4',
    },
  ]

  constructor(
    private route: Router,
    private alarmService: AlarmService,
    private medialibraryService: MediaLibraryService
  ){}

  ngOnInit(): void {
      this.alarmService.getall().subscribe((data: any) => {
        this.adzan_periods = [];
        this.iqamah_periods = [];

        data.forEach((element: any) => {
          if(element.isAdzan) this.adzan_periods.push(element);
          else this.iqamah_periods.push(element);
        });

        this.medialibraryService.availablealarms().subscribe((data: any) => {
          this.alarms = data.files;
        });
      });
  }

  backToMenu(){
    this.route.navigate(['setting']);
  }

  selectCat(cat: number){
    if(cat == 1) this.selectedAdzan = true;
    else this.selectedAdzan = false;
  }

  onChange(event: any, index: number) {
    if(this.selectedAdzan){
      this.adzan_periods[index].file = event.target.value;
    }
    else{
      this.iqamah_periods[index].file = event.target.value;
    }
  }

  updatealarm(){
    if(this.selectedAdzan){
      this.adzan_periods.forEach((element: any) => {
        this.alarmService.update(element, element.id).subscribe((data: any) => {});
      });
    }
    else{
      this.iqamah_periods.forEach((element: any) => {
        this.alarmService.update(element, element.id).subscribe((data: any) => {});
      });
    }
  }



}
