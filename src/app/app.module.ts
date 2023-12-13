import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HousingComponent } from './housing/housing.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTicketsComponent } from './air-tickets/air-tickets.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HousingComponent,
    CarRentalComponent,
    AirTicketsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Добавление AppRoutingModule для роутов
    HttpClientModule, // Добавление HttpClientModule в список импортируемых модулей
  ],
  providers: [
    ApiService //Добавление ApiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
