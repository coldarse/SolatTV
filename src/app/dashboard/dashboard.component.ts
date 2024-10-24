import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { appFunc } from '../_models/appFunc';
import { BackgroundImageService } from 'src/shared/proxy/backgroundimage/backgroundimage.service';
import { PrayerTimeService } from 'src/shared/proxy/prayertime/prayertime.service';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';
import { ScrollingTextService } from 'src/shared/proxy/scrollingtext/scrollingtext.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None, //Used to overwrite parent component css
})
export class DashboardComponent implements OnInit {

  template = 1;

  bgImg = '';

  counter = 0;

  img_duration = 15000;

  isFullScreen = false;

  img_interval: any;

  appsetting: any;

  textDuration: any;

  contents: any;

  isLoaded = false;

  //Call API in this component
  images = [
    {
      id: 0,
      file:'bg1',
      src: '../../assets/media/bg1.jpg',
      order: 0,
      edit:false
    },
  ];

  fullprayertime: any;

  periods = [
    {
      period: 'Imsak',
      time: '05:52',
      order: 0,
    },
    {
      period: 'Subuh',
      time: '07:07',
      order: 1,
    },
    {
      period: 'Syuruk',
      time: '12:20',
      order: 2,
    },
    {
      period: 'Zohor',
      time: '16:46',
      order: 3,
    },
    {
      period: 'Asar',
      time: '19:31',
      order: 4,
    },
    {
      period: 'Maghrib',
      time: '20:47',
      order: 5,
    },
    {
      period: 'Isyak',
      time: '02:25',
      order: 6,
    },
  ]


  constructor(
    private elementRef: ElementRef,
    private backgroundimageService: BackgroundImageService,
    private prayertimeService: PrayerTimeService,
    private appsettingService: AppSettingService,
    private scrollingtextService : ScrollingTextService,
  ){}

  ngOnDestroy(): void{
    clearInterval(this.img_interval);
  }

  ngOnInit(): void {
    this.backgroundimageService.getall_bi('true').subscribe((bi_data: any) => {
      this.images = bi_data;

      this.images = appFunc.sortArr(this.images);

      this.imgCycle();
      this.img_interval = setInterval(() => {
        this.imgCycle()
      }, this.img_duration);

      this.prayertimeService.getall().subscribe((data: any) => {
        this.fullprayertime = data;

        let date = new Date()
        let DOM = date.getDate();
        let MOY = date.getMonth() + 1;

        let todaydatestring = MOY.toString().padStart(2, '0') + '-' + DOM.toString().padStart(2, '0');

        let today_period = this.fullprayertime.find((element: any) => element.date == todaydatestring);

        this.periods = [];

        this.periods.push({
          period: 'Subuh',
          time: today_period.fajr,
          order: 1,
        });

        this.periods.push({
          period: 'Syuruk',
          time: today_period.syuruq,
          order: 2,
        });

        this.periods.push({
          period: 'Zohor',
          time: today_period.dhuhr,
          order: 3,
        });

        this.periods.push({
          period: 'Asar',
          time: today_period.asr,
          order: 4,
        });

        this.periods.push({
          period: 'Maghrib',
          time: today_period.maghrib,
          order: 5,
        });

        this.periods.push({
          period: 'Isyak',
          time: today_period.isha,
          order: 6,
        });

        this.appsettingService.get(1).subscribe((data: any) => {
          this.appsetting = data;

          this.template = this.appsetting.template;
          this.img_duration = this.appsetting.backgroundDuration * 1000;
          this.textDuration = this.appsetting.textDuration * 1000;

          this.scrollingtextService.getall_st('false').subscribe((data: any) => {
            this.contents = data;

            this.contents = appFunc.sortArr(this.contents);

            this.isLoaded = true;
          });
        });
      })
    });
  }

  imgCycle(){
    this.bgImg = this.images[this.counter].file;
    this.elementRef.nativeElement.ownerDocument.body.style.setProperty("background-image", `url(../../assets/images/${this.bgImg}.jpg)`);
    if (this.counter == this.images.length - 1){
      this.counter = -1;
    }
    this.counter++;
  }

  

}
