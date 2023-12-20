import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirTicketsComponent } from './air-tickets/air-tickets.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { HousingComponent } from './housing/housing.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  { path: '', redirectTo: '/housing', pathMatch: 'full' }, // Перенаправление на маршрут "housing" при загрузке приложения
  { path: 'air-tickets', component: AirTicketsComponent },
  { path: 'car-rental', component: CarRentalComponent },
  { path: 'housing', component: HousingComponent },

  { path: 'regOblect', component: HousingComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: 'auth', component: AuthorizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
