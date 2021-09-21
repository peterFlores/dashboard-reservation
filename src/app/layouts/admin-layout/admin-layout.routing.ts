import { Routes } from "@angular/router";
import { ClientComponent } from "./components/client/client.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserComponent } from "./components/user/user.component";


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {
      path: "user",
      component: UserComponent,
    },
    {
      path: "client",
      component: ClientComponent,
    },
  { path: "", redirectTo: "dashboard" },
];
