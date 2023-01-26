import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// HTTP
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
