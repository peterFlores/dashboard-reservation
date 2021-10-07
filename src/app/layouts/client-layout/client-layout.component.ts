import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-client-layout",
  templateUrl: "./client-layout.component.html",
  styleUrls: ["./client-layout.component.scss"]
})
export class ClientLayoutComponent implements OnInit {
  isMobileResolution: boolean;

  constructor() {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  @HostListener("window:resize", ["$event"])
  isMobile(event) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  ngOnInit() {}
}
