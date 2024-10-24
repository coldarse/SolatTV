import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KhotbahService } from 'src/shared/proxy/khotbah/khotbah.service';

@Component({
  selector: 'app-khutbah',
  templateUrl: './khutbah.component.html',
  styleUrls: ['./khutbah.component.css']
})
export class KhutbahComponent implements OnInit {

  scrollingTexts = '';

  jumbotronTexts = '';

  isUpdate = false;

  constructor(
    private route: Router,
    private khotbahService: KhotbahService,
  ){}

  ngOnInit(): void {
      this.khotbahService.get(1).subscribe((data: any) => {
        this.scrollingTexts = data.scrollingtexts;
        this.jumbotronTexts = data.jumbotrontexts;
      });
  }

  backToMenu(){
    this.route.navigate(['menu']);
  }

  updatekhotbah(){
    if(this.isUpdate){
      this.khotbahService.update({ "scrollingtexts": this.scrollingTexts, "jumbotrontexts": this.jumbotronTexts }, 1).subscribe((data:any) => {})
    }

    this.isUpdate = !this.isUpdate;
  }

}
