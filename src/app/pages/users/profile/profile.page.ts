import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexYAxis,
  ApexMarkers,
  ApexTooltip,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  fill: ApexFill;
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  customer: any;
  last_visit: Date;
  service: String;
  payment: Number;
  Payment = [];
  Date = [];
  currentYear = "2021"

  constructor(private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }


  ngOnInit() {
    this.getCustomer()
    this.getGraphData()
    this.getCurrentYear()
    this.Chart()
    this.Data();
  }

  getCustomer() {
    this.customer = JSON.parse(this.userService.getCustomerFromStorage());
    this.last_visit = this.customer.last_visit;
    this.service = this.customer.service;
    this.payment = this.customer.payment;
  }

  update() {
    let editedDate = this.last_visit.toString();
    if (editedDate.split('-')[1] === this.customer.last_visit.split('-')[1]) {
      this.userService.editProfile(this.customer.customer_data_id, this.customer.customer_id, this.service, this.payment, this.last_visit).subscribe(
        async data => {
          await this.alertService.presentToast(data['msg'], 'success');
          await this.userService.addCusomerToStorage(JSON.stringify(data['customer']))
        }
      )
    } else {
      this.userService.updateProfile(this.customer.customer_id, this.service, this.payment, this.last_visit).subscribe(
        async data => {
          this.alertService.presentToast(data['msg'], 'success');
          this.userService.addCusomerToStorage(JSON.stringify(data['customer']))
        }
      )
    }
  }

  getCurrentYear() {
    let date = new Date();
    this.currentYear = String(date.getFullYear());
  }

  async getGraphData() {
    await this.userService.getGraphData(this.customer.customer_id).subscribe(data => {
      data['Payment'].forEach(element => {
        this.Payment.push(element)
      });
      data['Date'].forEach(element => {
        this.Date.push(element)
      });
    })
  }

  Data(){
    let i=0;
    let series = [];

    // while(i<this.Date.length) {
    //   var x = this.Date[i];
    //   var y = this.Payment[i];
    //   series.push([x,y])
    //   i++;
    // }
    for(i=0; i<this.Date.length; i++) {
      console.log("Hello")
    }
    return series;
  }

  Chart() {
    this.chartOptions = {
      series: [
        {
          // data: this.Data()
          data: this.Payment
        }
      ],

      chart: {
        height: 360,
        type: "line",
        zoom: {
          enabled: false
        },

        toolbar: {
          show: false,
        }
      },

      stroke: {
        curve: 'smooth',
      },

      markers: {
        size: 6,
        hover: {
          size: 10
        }
      },

      fill: {
        colors: ["#00E396"],
        opacity: 0.8,
      },

      tooltip: {
        followCursor: false,
        theme: "dark",
        marker: {
          show: false
        },
        x: {
          show: false
        },
        y:{
          title:{
            formatter: function() {
              return "₹";
            }
          }
        }
      },

      xaxis: {
        title: {
          text: "Year "+this.currentYear
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",  "Sep", "Oct", "Nov", "Dec"]
      },

      yaxis: {
        title: {
          text: "Money Spend"
        },
        labels:{
          minWidth: 10
        },
        min: 0,
        max: 2000,
        tickAmount: 6
      }
    };
  }

  ngOnDestroy() {
    this.userService.remove('customer');
  }
}
