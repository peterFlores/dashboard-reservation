import { Component, OnInit } from '@angular/core';
import { Hostal } from 'src/app/layouts/admin-layout/components/hostal/hostal.model';
import { HostalService } from 'src/app/services/hostal.service';

@Component({
  selector: 'app-hostals',
  templateUrl: './hostals.component.html',
  styleUrls: ['./hostals.component.scss']
})
export class HostalsComponent implements OnInit {

  list: Hostal[] = [];

  constructor(private _hostalService: HostalService) {
   
  }

  ngOnInit() {
    this._hostalService.getHostal().subscribe(data => {
      this.list = data;
      console.log(this.list);
    });
  }

}
