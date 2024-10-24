import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';
import { ScrollingTextService } from 'src/shared/proxy/scrollingtext/scrollingtext.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  duration = 15;

  text = '';

  appsetting: any;

  constructor(
    private route: Router,
    private scrollingtextService: ScrollingTextService,
    private appsettingService: AppSettingService,
  ){}

  valueAscOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.value.localeCompare(b.value);
  }

  texts = [
    {
      id: 0,
      text: 'a',
      order: 0,
      edit: false,
      isScrolling: false,
    },
  ]

  sortArr(){
    this.texts.sort((a,b) => {
      return a.order - b.order;
    });
  }

  ngOnInit(): void {
    this.scrollingtextService.getall_st('false').subscribe((data: any) => {
      this.texts = data;

      this.sortArr();

      this.appsettingService.get(1).subscribe((as_data: any) => {
        this.appsetting = as_data;
        this.duration = as_data.textDuration;
      });
    });
  }

  editText(index: number){
    this.texts[index].edit = !this.texts[index].edit;

    if(!this.texts[index].edit){
      this.scrollingtextService.update(this.texts[index], this.texts[index].id).subscribe((data: any) => {
        this.scrollingtextService.getall_st('false').subscribe((data: any) => {
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

  add_text(){

    const temp = {
      text: this.text,
      order: this.texts.length,
      edit: false,
      isScrolling: false,
    }

    this.scrollingtextService.create(temp).subscribe((data: any) => {
      this.scrollingtextService.getall_st('false').subscribe((data: any) => {
        this.texts = data;

        this.sortArr();
      });
    });

    this.text = '';
  }

  backToMenu(){
    this.route.navigate(['menu']);
  }

  updateSequence(){
    this.texts.forEach((elem, index) => {
      elem.order = index;
      this.scrollingtextService.update(elem, elem.id).subscribe((data: any) => {
        this.scrollingtextService.getall_st('false').subscribe((data: any) => {
          this.texts = data;

          this.sortArr();
        });
      })
    })
  }

  updateduration(){
    this.appsetting.textDuration = this.duration;

    this.appsettingService.update(this.appsetting, 1).subscribe((data: any) => {
    })
  }

}
