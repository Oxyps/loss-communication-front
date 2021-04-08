import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModules } from './components/shared/shared-modules.module';
import { NavListItemComponent } from './components/layout/nav-list-item/nav-list-item.component';
import { NavService } from './components/layout/nav-list-item/nav-service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavListItemComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,

    AppRoutingModule,

    SharedModules,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    NavService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
