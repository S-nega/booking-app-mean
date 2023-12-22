import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HousingComponent } from './housing/housing.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { AirTicketsComponent } from './air-tickets/air-tickets.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegNewHouseComponent } from './reg-new-house/reg-new-house.component';
import { UserComponent } from './user/user.component';
import { HouseBookingComponent } from './house-booking/house-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HousingComponent,
    CarRentalComponent,
    AirTicketsComponent,
    RegistrationComponent,
    AuthorizationComponent,
    RegNewHouseComponent,
    UserComponent,
    HouseBookingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, //Добавление AppRoutingModule для роутов
    HttpClientModule, // Добавление HttpClientModule в список импортируемых модулей
  ],
  providers: [
    ApiService //Добавление ApiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}