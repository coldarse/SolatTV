import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';
import { ScrollingTextService } from 'src/shared/proxy/scrollingtext/scrollingtext.service';

@Component({
  selector: 'app-scrolling-texts',
  templateUrl: './scrolling-texts.component.html',
  styleUrls: ['./scrolling-texts.component.css']
})
export class ScrollingTextsComponent implements OnInit {

  duration = 15;

  appsetting: any;

  constructor(
    private route: Router,
    private scrollingtextService: ScrollingTextService,
    private appsettingService: AppSettingService,
  ){}

  sortArr(){
    this.texts.sort((a,b) => {
      return a.order - b.order;
    });
  }

  texts = [
    {
      id: 0,
      text: 'a',
      order: 0,
      edit: false,
      isScrolling: true,
    },
  ]

  ngOnInit(): void {
    this.scrollingtextService.getall_st('true').subscribe((data: any) => {
      this.texts = data;

      this.sortArr();

      this.appsettingService.get(1).subscribe((as_data: any) => {
        this.appsetting = as_data;
        this.duration = as_data.scrollingtextDuration;
      });
    });
  }

  editText(index: number){
    this.texts[index].edit = !this.texts[index].edit;

    if(!this.texts[index].edit){
      this.scrollingtextService.update(this.texts[index], this.texts[index].id).subscribe((data: any) => {
        this.scrollingtextService.getall_st('true').subscribe((data: any) => {
          this.texts = data;

          this.sortArr();
        });
      })
    }
  }


  upSequence(index: number){
    const tempVal = this.texts[index];
    const i = this.texts.indexOf(tempVal);
    if (i > -1) { 
      this.texts.splice(index, 1);
    }
    const newIndex = index - 1;
    this.texts.splice(newIndex, 0, tempVal);

    this.updateSequence();
  }

  downSequence(index: number){
    const tempVal = this.texts[index];
    const i = this.texts.indexOf(tempVal);
    if (i > -1) { 
      this.texts.splice(index, 1);
    }
    const newIndex = index + 1;
    this.texts.splice(newIndex, 0, tempVal);

    this.updateSequence();
  }

  updateSequence(){
    this.texts.forEach((elem, index) => {
      elem.order = index;
      this.scrollingtextService.update(elem, elem.id).subscribe((data: any) => {
        this.scrollingtextService.getall_st('true').subscribe((data: any) => {
          this.texts = data;

          this.sortArr();
        });
      })
    })
  }

  backToMenu(){
    this.route.navigate(['menu']);
  }

  updateduration(){
    this.appsetting.scrollingtextDuration = this.duration;

    this.appsettingService.update(this.appsetting, 1).subscribe((data: any) => {
    })
  }

}
