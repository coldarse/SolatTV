import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaLibraryService } from 'src/shared/proxy/medialibrary/medialibrary.service';
import { MosqueProfileService } from 'src/shared/proxy/mosqueprofile/mosqueprofile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedLogoURL = '../../assets/media/bg1.jpg';
  selectedLogoName = 'bg1.png';

  mosqueprofile: any;

  constructor(
    private route: Router,
    private mosqueprofileService: MosqueProfileService,
    private medialibraryService: MediaLibraryService, 
  ){}

  logos =[
    {
      src: '../../assets/media/bg1.jpg',
      file: 'bg1.jpg',
    },
  ]

  ngOnInit(): void {
    this.mosqueprofileService.get(1).subscribe((data: any) => {
      this.mosqueprofile = data;

      this.selectedLogoURL = this.mosqueprofile.src;
      this.selectedLogoName = this.mosqueprofile.src.replace('../../assets/media/', '');

      this.medialibraryService.availableimages().subscribe((ml_data: any) => {
        this.logos = ml_data.files;
        this.logos.forEach(element => {
          element.src = element.src.replace('/Users/danny/Documents/GitHub/SolatTV/src/', '../../');
        });
      });
    });
  }

  selectedLogo(index: number){
    this.selectedLogoURL = this.logos[index].src;
    this.selectedLogoName = this.logos[index].file;

    this.mosqueprofile.src = this.selectedLogoURL;
  }

  backToMenu(){
    this.route.navigate(['setting']);
  }

  updateprofile(){
    this.mosqueprofileService.update(this.mosqueprofile, this.mosqueprofile.id).subscribe((data: any) => {
      console.log(data);
    })
  }

}
