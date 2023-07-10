import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomReuseStrategy } from './core/utils/reuse-strategy';

@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    CoreModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
