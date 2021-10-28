import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { ReportService } from "src/app/services/report.service";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../../variables/charts";
import { Report } from "./report.model";


// core components

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  report: Report;

  constructor(private _reportService: ReportService) { }

  ngOnInit() {
    this._reportService.getReports().subscribe(datas => {
      this.report = datas;
      console.log(this.report);
      let months = this.report?.totalBalancePerMonth.map(m => m.date);
      let data = this.report?.totalBalancePerMonth.map(m => m.total);
      let dataChart = {
        labels: months,
        datasets: [
          {
            label: "Monto",
            data: data
          }
        ]
      }
      this.salesChart = new Chart(chartSales, {
        type: "line",
        options: chartExample1.options,
        data: dataChart
      });

      let months2 = this.report?.totalReservationsPerMonth.map(m => m.date);
      let data2 = this.report?.totalReservationsPerMonth.map(m => m.count);
      let dataChart2 = {
        labels: months2,
        datasets: [
          {
            label: "Cantidad",
            data: data2
          }
        ]
      }
      var ordersChart = new Chart(chartOrders, {
        type: "bar",
        options: chartExample2.options,
        data: dataChart2
      });
    });
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById("chart-bars");

    parseOptions(Chart, chartOptions());



    var chartSales = document.getElementById("chart-sales-dark");

  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}

