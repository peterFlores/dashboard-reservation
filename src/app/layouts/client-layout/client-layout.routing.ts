import { Routes } from "@angular/router";
import { HostalsComponent } from "src/app/layouts/client-layout/components/hostals/hostals.component";
import { HostalsDetailComponent } from "./components/hostals-detail/hostals-detail.component";
import { MainClientComponent } from "./components/main-client/main-client.component";
import { ReservationComponent } from "./components/reservation/reservation.component";


export const ClientLayoutRoutes: Routes = [
    { path: 'reservations',      component: ReservationComponent },
    { path: 'hostals',      component: HostalsComponent },
    { path: 'hostals/:id', component: HostalsDetailComponent },
    { path: 'main', component: MainClientComponent},
    
  { path: "", redirectTo: "main" },
];
