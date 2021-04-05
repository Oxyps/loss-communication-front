import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FarmerService } from './services/farmer.service'
import { TillageService } from './services/tillage.service';
import { CommunicationService } from './services/communication.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    FarmerService,
    TillageService,
    CommunicationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
