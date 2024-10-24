import { Component, Input, OnInit } from '@angular/core';
import { PrayerTimeService } from 'src/shared/proxy/prayertime/prayertime.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

  @Input() periods: any;

  constructor(
  ){}

  ngOnInit(): void {
  }

}
