import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [
		AppComponent,
		ClockComponent,
		CalendarComponent,
		WeatherComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		HttpClientModule
  ],
  providers: [
		WeatherService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
