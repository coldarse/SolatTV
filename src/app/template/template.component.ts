import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/shared/proxy/appsetting/appsetting.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  templates: any = [
    {
      src:'../../assets/images/template_1.png',
      name: 'Template 1',
    },
    {
      src:'../../assets/images/template_2.png',
      name: 'Template 2',
    },
  ];

  template = '';

  appsetting: any;

  constructor(
    private route: Router,
    private appsettingService: AppSettingService,
  ){}

  ngOnInit(): void {
    this.appsettingService.get(1).subscribe((as_data: any) => {
      this.appsetting = as_data;
      this.template = as_data.template == 1 ? 'Template 1' : 'Template 2';
    });
  }

  backToMenu(){
    this.route.navigate(['setting']);
  }

  SelectTemplate(template: string){
    this.template = template;
  }
  
  updatetemplate(){
    this.appsetting.template = this.template == 'Template 1' ? 1 : 2;

    this.appsettingService.update(this.appsetting, 1).subscribe((data: any) => {
    })
  }

}
