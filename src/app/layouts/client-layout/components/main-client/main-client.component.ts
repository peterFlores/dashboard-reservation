import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.scss']
})
export class MainClientComponent implements OnInit {
  items = [
    { name: "Hostales", icon: "shop", path: "/client/hostals" },
    { name: "Reservar", icon: "bell-55", path: "/client/reservations" },
    { name: "Tus reservaciones", icon: "archive-2", path: "/client/reservations-user" }
  
  ]
  constructor() { }

  ngOnInit() {
  }

}
