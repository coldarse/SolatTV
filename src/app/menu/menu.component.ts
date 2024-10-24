import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private route: Router,
  ){}

  selectedMenu(menuindex: number){
    switch(menuindex) { 
      case 1: { 
         this.route.navigate(['files']);
         break; 
      } 
      case 2: { 
         this.route.navigate(['background-image']);
         break; 
      }
      case 3: { 
         this.route.navigate(['scrolling-texts']);
         break; 
      } 
      case 4: { 
         this.route.navigate(['khutbah']);
         break; 
      }
      case 5: { 
        this.route.navigate(['islamic-calendar']);
        break; 
      } 
      case 6: { 
          this.route.navigate(['full-screen']);
          break; 
      }
      case 7: { 
          this.route.navigate(['texts']);
          break; 
      } 
      case 8: { 
          this.route.navigate(['setting']);
          break; 
      }
   } 
  }

}
