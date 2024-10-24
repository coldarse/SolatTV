import { Component, Input, OnInit } from '@angular/core';
import { SolatService } from '../solat.service';
import { appFunc } from '../_models/appFunc';
import { ScrollingTextService } from 'src/shared/proxy/scrollingtext/scrollingtext.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  //Call API in this component
  @Input() contents = [
    {
      id: 0,
      text: 'a',
      order: 0,
      edit: false,
      isScrolling: true,
    },
  ]

  current_text = '';

  counter = 1;

  text_interval: any;

  trans = true;

  @Input() textDuration: any;

  constructor(
    
  ){}

  ngOnDestroy(): void{
    clearInterval(this.text_interval);
  }

  ngOnInit(): void {
    this.current_text = this.contents[this.counter].text
    this.text_interval = setInterval(() => {
      this.textCycle();
    }, this.textDuration);
  }

  textCycle() {
    setTimeout(() => {
      this.current_text = this.contents[this.counter].text;
      if (this.counter == this.contents.length - 1) {
        this.counter = -1;
      }
      this.counter++;
    }, this.textDuration);
    
  }

  

}
