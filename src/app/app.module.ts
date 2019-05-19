import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DeprecatedDatePipe } from '@angular/common';
import { DateService } from './services/date.service';

@NgModule({
  declarations: [
		AppComponent,
		ClockComponent,
		CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
		DateService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
