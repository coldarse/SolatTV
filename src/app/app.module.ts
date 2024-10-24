import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { PeriodComponent } from './period/period.component';
import { InformationComponent } from './information/information.component';
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IslamicCalendarComponent } from './islamic-calendar/islamic-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    PeriodComponent,
    InformationComponent,
    LoginComponent,
    MenuComponent,
    SettingComponent,
    ProfileComponent,
    FilesComponent,
    ScrollingTextsComponent,
    BackgroundImageComponent,
    FullScreenComponent,
    TextComponent,
    TemplateComponent,
    SolatTimeComponent,
    AlarmComponent,
    IqamahComponent,
    MasaSenyapComponent,
    KhutbahComponent,
    IslamicCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
