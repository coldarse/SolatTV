import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { appFunc } from '../_models/appFunc';
import { ScrollingTextService } from 'src/shared/proxy/scrollingtext/scrollingtext.service';
import { PrayerTimeService } from 'src/shared/proxy/prayertime/prayertime.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() template: number = 1;

  @Input() periods: any;

  //Call API in this component
  scrolling_texts: any = [
    {
      text: 'Sebaik-baik manusia adalah orang yang belajar Al-Qur\'an & mengajarkannya1.',
      order: 0
    },
    {
      text: 'Sebaik-baik manusia adalah orang yang belajar Al-Qur\'an & mengajarkannya2.',
      order: 2
    },
    {
      text: 'Sebaik-baik manusia adalah orang yang belajar Al-Qur\'an & mengajarkannya3.',
      order: 1
    }
  ]

  current_text = '';

  next_prayer_countdown = '';

  next_event_countdown_in_days = '';
  
  text_interval: any;

  time_interval: any;

  counter = 0;

  fullprayertime: any;

  constructor(
    private scrollingtextService: ScrollingTextService,
  ){}

  ngOnDestroy(): void{
    clearInterval(this.text_interval);
    clearInterval(this.time_interval);
  }

  ngOnInit(): void {

    this.time_interval = setInterval(() => {

      for(let period of this.periods){
        //Get Current Date
        let datetimenow = new Date();
        //Format Current Date 
        let datetimenow_formatted = formatDate(Date.now(), 'dd/MM/yyyy HH:mm:ss', 'en');
        //Get Date Part of Current Date 
        let [dateComponents] = datetimenow_formatted.split(' ');
        //Get Components of Date part of Current Date
        let [day, month, year] = dateComponents.split('/');
        //Get Time Components from Period Time
        let [hours, minutes] = period.time.split(':');
        //Create a new Date Object using current Date and Period Time
        let period_time = new Date(+year, +month - 1, +day, +hours, +minutes);
        //Check if is Isyak to add additional day to new Date Object
        if(period.period == 'Isyak') period_time.setDate(period_time.getDate() + 1);
        //Get date difference in milliseconds to check for upcoming prayer time.
        let dateDiff = datetimenow.getTime() - period_time.getTime();
        //Check if date difference is a negative number, meaning is nearest upcoming
        if(dateDiff < 0){
          //Convert milliseconds to time difference, must first convert to positive number to work correctly
          this.next_prayer_countdown = period.period + ' -' + appFunc.convertMsToTime(Math.abs(dateDiff));
          break;
        }
      };
    }, 1000);
    

    this.scrollingtextService.getall_st('true').subscribe((data: any) => {
      this.scrolling_texts = data;

      this.scrolling_texts = appFunc.sortArr(this.scrolling_texts);

      this.scrolling_texts = this.scrolling_texts.filter((element: any) => element.text != '-')

      this.current_text = this.scrolling_texts[this.counter].text;
      this.text_interval = setInterval(() => {
        this.textCycle();
      }, 15000);
    });

    
  }

  textCycle() {
    this.current_text = this.scrolling_texts[this.counter].text;
    if (this.counter == this.scrolling_texts.length - 1) {
      this.counter = -1;
    }
    this.counter++;
  }

}
