import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportceComponent } from './Components/Imaging/ReportCE/reportce/reportce.component';
import { LoginComponent } from './Components/Login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportceComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
