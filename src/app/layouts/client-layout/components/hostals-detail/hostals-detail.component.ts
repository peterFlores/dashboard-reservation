import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hostal } from 'src/app/layouts/admin-layout/components/hostal/hostal.model';
import { HostalService } from 'src/app/services/hostal.service';

@Component({
  selector: 'app-hostals-detail',
  templateUrl: './hostals-detail.component.html',
  styleUrls: ['./hostals-detail.component.scss']
})
export class HostalsDetailComponent implements OnInit {
  private sub: Subscription;
  hostal: Hostal;
  picturePath: string;
  constructor(private route: ActivatedRoute, private _hostalService: HostalService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getServices(params.id);
    }); 
    this.updatePicture();
  }
  getServices(id: any): void {
    
    this._hostalService.getHostalById(id).subscribe(data => {
      this.hostal = data;
      this.picturePath = data.pictures[0];
      console.log(this.hostal);
    });
  }
  updatePicture() {
    var index = 0;
    setInterval(() => {         //replaced function() by ()=>
      index = (index + 1) % this.hostal.pictures.length;
      this.picturePath = this.hostal.pictures[index];
    }, 4000);
  }
}
