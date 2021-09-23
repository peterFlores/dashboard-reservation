import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './components/client/client.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { UserComponent } from './components/user/user.component';
import { MenuComponent } from './components/menu/menu.component';



@NgModule({
  declarations: [
    ClientComponent,
    UserComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),

  ]
})
export class AdminLayoutModule { }
