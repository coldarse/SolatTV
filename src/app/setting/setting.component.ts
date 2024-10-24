import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {

  constructor(
    private route: Router,
  ){}

  backToMenu(){
    this.route.navigate(['menu']);
  }

  select_setting(menuindex: number){
    switch(menuindex) { 
      case 1: { 
         this.route.navigate(['profile']);
         break; 
      } 
      case 2: { 
         this.route.navigate(['solat-time']);
         break; 
      }
      case 3: { 
         this.route.navigate(['templates']);
         break; 
      } 
      case 4: { 
         this.route.navigate(['alarm']);
         break; 
      }
      case 5: { 
        this.route.navigate(['iqamah']);
        break; 
      } 
      case 6: { 
          this.route.navigate(['masa-senyap']);
          break; 
      }
      case 7: { 
          // this.route.navigate(['texts']);
          break; 
      } 
      case 8: { 
          // this.route.navigate(['event']);
          break; 
      }
    }
  }

}
