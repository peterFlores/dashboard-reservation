import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientLayoutRoutes } from './client-layout.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgSelectModule } from '@ng-select/ng-select';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HostalsComponent } from 'src/app/layouts/client-layout/components/hostals/hostals.component';
import { HostalsDetailComponent } from './components/hostals-detail/hostals-detail.component';
import { MainClientComponent } from './components/main-client/main-client.component';



@NgModule({
  declarations: [
    ReservationComponent, 
    HostalsComponent,
    HostalsDetailComponent,
    MainClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule
  ]
})
export class ClientLayoutModule { }
