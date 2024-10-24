import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { FilesComponent } from './files/files.component';
import { ScrollingTextsComponent } from './scrolling-texts/scrolling-texts.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { TextComponent } from './text/text.component';
import { TemplateComponent } from './template/template.component';
import { SolatTimeComponent } from './solat-time/solat-time.component';
import { AlarmComponent } from './alarm/alarm.component';
import { IqamahComponent } from './iqamah/iqamah.component';
import { MasaSenyapComponent } from './masa-senyap/masa-senyap.component';
import { KhutbahComponent } from './khutbah/khutbah.component';
import { IslamicCalendarComponent } from './islamic-calendar/islamic-calendar.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'files', component: FilesComponent},
  {path: 'scrolling-texts', component: ScrollingTextsComponent},
  {path: 'background-image', component: BackgroundImageComponent},
  {path: 'full-screen', component: FullScreenComponent},
  {path: 'texts', component: TextComponent},
  {path: 'templates', component: TemplateComponent},
  {path: 'solat-time', component: SolatTimeComponent},
  {path: 'alarm', component: AlarmComponent},
  {path: 'iqamah', component: IqamahComponent},
  {path: 'masa-senyap', component: MasaSenyapComponent},
  {path: 'khutbah', component: KhutbahComponent},
  {path: 'islamic-calendar', component: IslamicCalendarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
