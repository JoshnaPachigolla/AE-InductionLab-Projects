import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Region = ['South', 'West', 'Midwest', 'Northeast'];
  Industry = [
    'Professional Services',
    'Education',
    'Transportation',
    'Retail',
    'Software/Hardware',
    'Energy',
  ];
  Year = ['2020', '2021', '2022'];
  totalRecord: number = 0;
  result: any;
  originalData:any;
  page: number = 1;
  p=[0,0,0,0,0,0];
  bar:any=[];
  month=[0,0,0,0,0,0,0,0,0,0,0,0];
  searchValue: Map<any, any> = new Map();
  graphdata: any;
  pie:any=[];
  total:number=0;
  totalper=[0,0,0,0,0,0];
  per:any=[];
  // r1 = 0;r2 = 0;r3 = 0;r4 = 0;r5 = 0;r6 = 0;
 
  key: string = 'id';
  reverse:boolean = false;
  sort(key: string){
    this.key=key;
    this.reverse=!this.reverse;
  }
  salesData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Monthly Sales', data: [], 
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1},
    ],
  };
  pieData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Revenue', data: [], },
    ],
  };

  chartOptions1: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "Months",
          font: {
            size: 15
          }
        }
      },
      yAxes: {
        title: {
          display: true,
          text: 'Values(Revenue)',
          font: {
            size: 15
          }
        },

      }
    },

    plugins: {
      title: {
        display: true,
        text: '',
      },
    },
  };
  chartOptions2: ChartOptions = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: '',
      },
    },
    
  };
 
  
  constructor(private dataService:DataService){
    this.dataService.getData().then((res) => {
      this.result = res;
      this.originalData=this.result;
      this.totalRecord=this.result.length;
      
    });
  }
  ngOnInit(): void {
    
  }
  
  selectRegion(value: string) {
        this.searchValue.set('Region', value);
        this.filterData();
      }
      selectYear(value: string) {
        this.searchValue.set('Year', value);
        // console.log(this.searchValue);
        this.filterData();
      }
      selectIndustry(value: string) {
        this.searchValue.set('Industry', value);
        // console.log(this.searchValue);
        this.filterData();
      }
      filterData() {
        this.result = this.originalData;
        if (this.searchValue.get('Region') != null) {
          this.result = this.result.filter(
            (e: { Region: any }) => e.Region == this.searchValue.get('Region')
          );
        }
        if (this.searchValue.get('Year') != null) {
          this.result = this.result.filter(
            (e: { Year: any }) => e.Year == this.searchValue.get('Year')
          );
        }
        
        if (this.searchValue.get('Industry') != null) {
          this.result = this.result.filter(
            (e: { Industry: any }) => e.Industry == this.searchValue.get('Industry')
          );
        }
        this.totalRecord = this.result.length;
        // console.log(this.result);
        // this.chartData(this.result);
        
        
      }
      
      
      generateGraph(Region:any,Year:any){
        if(Region && Year){
         this.filterData();
         console.log(this.result);
         this.month=[0,0,0,0,0,0,0,0,0,0,0,0];
        this.p=[0,0,0,0,0,0];
         this.bar=this.result;
        //  this.pie=this.result;
         for (let i: number = 0; i < this.result.length; i++) {
                if (this.bar[i].Month == 0) {
                  this.month[0] = this.month[0] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 1) {
                  this.month[1] = this.month[1] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 2) {
                  this.month[2] = this.month[2] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 3) {
                  this.month[3] = this.month[3] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 4) {
                  this.month[4] = this.month[4] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 5) {
                  this.month[5] = this.month[5] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 6) {
                  this.month[6] = this.month[6] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 7) {
                  this.month[7] = this.month[7] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 8) {
                  this.month[8] = this.month[8] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 9) {
                  this.month[9] = this.month[9] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 10) {
                  this.month[10] = this.month[10] + Number(this.bar[i].ProjectedRevenue);
                } else if (this.bar[i].Month == 11) {
                  this.month[11] = this.month[11] + Number(this.bar[i].ExpectedRevenue);
                }
              }
              console.log(this.month);
              this.total=0;
              for (let i: number = 0; i < this.result.length; i++) {
                      if (this.bar[i].Industry == 'Professional Services') {
                        this.p[0]=this.p[0] + Number(this.bar[i].ProjectedRevenue);
                        
                      } else if (this.bar[i].Industry == 'Education') {
                        this.p[1]=this.p[1] + Number(this.bar[i].ProjectedRevenue);
                       
                      } else if (this.bar[i].Industry == 'Transportation') {
                        this.p[2]=this.p[2] + Number(this.bar[i].ProjectedRevenue);
                        
                      } else if (this.bar[i].Industry == 'Retail') {
                        this.p[3]=this.p[3]+ Number(this.bar[i].ProjectedRevenue);
                        
                      } else if (this.bar[i].Industry == 'Software/Hardware') {
                        this.p[4]=this.p[4]+ Number(this.bar[i].ProjectedRevenue);
                        
                      } else if (this.bar[i].Industry == 'Energy') {
                        this.p[5]=this.p[5] + Number(this.bar[i].ProjectedRevenue);
                        
                      }
                     
                    }
                    this.totalper=this.p;
                    console.log(this.p);
                    for(let j:number=0;j<this.p.length;j++)
                    {
                      this.total=this.total+Number(this.p[j]);
                      console.log(this.total);
                    }
                    for(let j:number=0;j<this.p.length;j++)
                    {
                    this.totalper[j]=Math.round((this.totalper[j]/this.total)*100);
                    this.per[j]=String(this.totalper[j].toFixed(1))+"%";
                    // console.log(per);
                    // console.log(typeof(per));
                    // this.per[j]=this.per[j].push(per);
                    // this.totalper[j]=Number(per);
                    }
                    console.log(this.per);

         this.salesData={
          labels:[ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',],
          datasets:[
            {label:'Monthly Sales(Revenue)', data:this.month,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',

            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1}
          ],
          
          
         }
         this.pieData={
          labels:['Professional Services',
          'Education',
          'Transportation',
          'Retail',
          'Software/Hardware',
          'Energy',],
          datasets:[
            {label:'Revenue', data:this.totalper,}
          ],
          
         }
         
        }
        
      }

}
//   