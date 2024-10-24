import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrayerTimeService } from 'src/shared/proxy/prayertime/prayertime.service';

@Component({
  selector: 'app-islamic-calendar',
  templateUrl: './islamic-calendar.component.html',
  styleUrls: ['./islamic-calendar.component.css']
})
export class IslamicCalendarComponent implements OnInit{

  fileToUpload: File | null = null;

  periods = [
    {
      id: 1,
      date: "01-01",
      fajr: "06:11",
      syuruq: "07:21",
      dhuhr: "13:22",
      asr: "16:44",
      maghrib: "19:16",
      isha: "20:31"
    }
  ]

  constructor(
    private route: Router,
    private prayertimeService: PrayerTimeService
  ){}

  ngOnInit(): void {
    this.prayertimeService.getall().subscribe((data: any) => {
      this.periods = data;
    })
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.target.files.item(0);
  }

  backToMenu(){
    this.route.navigate(['menu']);
  }

  uploadfile(){
    const formData = new FormData();

    if(this.fileToUpload) formData.append("excel_file", this.fileToUpload);

    this.prayertimeService.excel(formData).subscribe((data: any) => {
      this.fileToUpload = null;
      this.prayertimeService.getall().subscribe((data: any) => {
        this.periods = data;
      })
    })

  }

}
