import { Component, OnInit } from '@angular/core';
import { MosqueProfileService } from 'src/shared/proxy/mosqueprofile/mosqueprofile.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  weekday_bm = [
    'Ahad',
    'Isnin',
    'Selasa',
    'Rabu',
    'Khamis',
    'Jumaat',
    'Sabtu'
  ];

  month_bm = [
    'Januari', 
    'Februari', 
    'Mac', 
    'April', 
    'Mei', 
    'Jun', 
    'Julai', 
    'Ogos', 
    'September', 
    'Oktober', 
    'November', 
    'Disember'
  ]

  date: any;

  today_day = '';

  today_date = '';

  today_month = '';

  today_year = '';

  islamic_date = '';

  time_now: number | undefined;

  mosque_name = '';

  mosque_info = '';

  time_interval: any;

  mosqueprofile: any;

  logoURL: any;

  constructor(
    private mosqueprofileService: MosqueProfileService,
  ){}

  ngOnInit(): void {

    this.mosqueprofileService.get(1).subscribe((data: any) => {
      this.mosqueprofile = data;

      this.logoURL = this.mosqueprofile.src;
      this.mosque_name = this.mosqueprofile.mosque1 + ' ' + this.mosqueprofile.mosque2;
      this.mosque_info = this.mosqueprofile.address + ' | ' + this.mosqueprofile.telephone;

      this.time_interval = setInterval(() => {
        this.date = new Date();
        this.time_now = Date.now();
        this.today_day = this.weekday_bm[this.date.getDay()];

        this.today_date = this.date.getDate();
        this.today_year = this.date.getFullYear();
        this.today_month = this.month_bm[this.date.getMonth()];
        
      }, 1000);
    });
  }
}
