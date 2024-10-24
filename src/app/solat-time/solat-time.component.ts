import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solat-time',
  templateUrl: './solat-time.component.html',
  styleUrls: ['./solat-time.component.css']
})
export class SolatTimeComponent {

  serverDate = '';
  serverTime = '';

  deviceDate = '';
  deviceTime = ''

  constructor(
    private route: Router,
  ){}

  backToMenu(){
    this.route.navigate(['setting']);
  }

  update(){

  }
  
}
