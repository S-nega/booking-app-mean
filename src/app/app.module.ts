import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HousingComponent } from './housing/housing.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTicketsComponent } from './air-tickets/air-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HousingComponent,
    CarRentalComponent,
    AirTicketsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
