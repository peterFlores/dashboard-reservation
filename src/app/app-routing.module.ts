import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { ClientLayoutComponent } from "./layouts/client-layout/client-layout.component";

const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      },
      // {
      //   path: "components",
      //   loadChildren: "./pages/components/components.module#ComponentsModule"
      // }
    ],
   // canActivate: [AuthGuard]
  },
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      {
        path: "client",
        loadChildren:
          "./layouts/client-layout/client-layout.module#ClientLayoutModule"
      },
      // {
      //   path: "components",
      //   loadChildren: "./pages/components/components.module#ComponentsModule"
      // }
    ],
   // canActivate: [AuthGuard]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren:
          "./layouts/auth-layout/auth-layout.module#AuthLayoutModule"
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
