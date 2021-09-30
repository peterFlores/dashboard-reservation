import { Routes } from "@angular/router";
import { ClientComponent } from "./components/client/client.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MenuComponent } from "./components/menu/menu.component";
import { UserComponent } from "./components/user/user.component";
import { HostalComponent } from "./components/hostal/hostal.component";



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {
      path: "hostal",
      component: HostalComponent,
    },
    {
      path: "menu",
      component: MenuComponent,
    },
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
