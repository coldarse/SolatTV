
import { Component, Input, OnInit } from '@angular/core';
import { PrayerTimeService } from 'src/shared/proxy/prayertime/prayertime.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() template: number = 1;

  @Input() periods: any;
  
  constructor(
  ){}

  ngOnInit(): void {
    
  }

  
}
