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
  // r1 = 0;r2 = 0;r3 = 0;r4 = 0;r5 = 0;r6 = 0;

  salesData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Monthly Sales', data: [], tension: 0.5 },
    ],
  };
  pieData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { label: 'Revenue', data: [], tension: 0.5 },
    ],
  };

  chartOptions1: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "months",
          font: {
            size: 15
          }
        }
      },
      yAxes: {
        title: {
          display: true,
          text: 'value',
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
//       this.chartData(this.result);
    });
  }
  ngOnInit(): void {}
  
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
                    console.log(this.p);
         this.salesData={
          labels:[ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',],
          datasets:[
            {label:'Monthly Sales', data:this.month,
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
                    'Energy', ],
          datasets:[
            {label:'Revenue', data:this.p,
          }
          ],
          
         }
        }
      }

}
//   Region = ['South', 'West', 'Midwest', 'Northeast'];
//   Industry = [
//     'Professional Services',
//     'Education',
//     'Transportation',
//     'Retail',
//     'Software/Hardware',
//     'Energy',
//   ];
//   Year = ['2020', '2021', '2022'];
//   result: any;
//   exp_rev: any;
//   chart1: any = [];
//   chart2: any = [];
//   originalData: any = [];
//   pie: any = [];
//   bar: any = [];
//   page:number=1;
//   p : any=[];
//   month=[0,0,0,0,0,0,0,0,0,0,0,0];
//   r1=0;r2=0;r3=0;r4=0;r5=0;r6=0;
//   totalRecord:number=0;
//   searchValue: Map<any, any> = new Map();
  
//   constructor(private dataservice:DataService) {
//     Chart.register(...registerables);
//   }
//   ngOnInit(){
//     this.dataservice.getData().then((res)=>{
//       this.result = res;
//       this.pie=this.result;
//       this.originalData=this.result;
//       this.totalRecord=this.result.length;
//       // console.log(this.result);
//       this.exp_rev = this.result.map((Revenue: any) => Revenue.ProjectedRevenue);
//       // this.month=this.result.map((m:any)=>m.Month)
//       // console.log(this.exp_rev);
//       // console.log(this.month);
      
//       this.bar=this.pie;
//       for(let i:number=0;i<this.pie.length;i++){
//         if(this.pie[i].Industry=="Retail"){
//           this.r1=Number(this.r1)+Number(this.pie[i].ProjectedRevenue);
//           // console.log(this.r1);
//         }
//         else if(this.pie[i].Industry=="Energy"){
//           this.r2=Number(this.r2)+Number(this.pie[i].ProjectedRevenue);
//           // console.log(this.r2);
//         }
//         else if(this.pie[i].Industry=="Software/Hardware"){
//           this.r3=Number(this.r3)+Number(this.pie[i].ProjectedRevenue);
//           // console.log(this.r3);
//         }
//         else if(this.pie[i].Industry=="Transportation"){
//           this.r4=Number(this.r4)+Number(this.pie[i].ProjectedRevenue);
//           // console.log(this.r4);
//         }
//         else if(this.pie[i].Industry=="Professional Services"){
//           this.r5=Number(this.r5)+Number(this.pie[i].ProjectedRevenue);
//           // console.log(this.r5);
//         }
//         else if(this.pie[i].Industry=="Education"){
//           this.r6=Number(this.r6)+Number(this.pie[i].ProjectedRevenue);
//           // console.log(this.r6);
//         }
//       }
//         this.p=[this.r1,this.r2,this.r3,this.r4,this.r5,this.r6];
        
        
//         for(let i:number=0;i<this.pie.length;i++){
//           if(this.bar[i].Month==0){
//             this.month[0]=this.month[0]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==1){
//             this.month[1]=this.month[1]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==2){
//             this.month[2]=this.month[2]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==3){
//             this.month[3]=this.month[3]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==4){
//             this.month[4]=this.month[4]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==5){
//             this.month[5]=this.month[5]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==6){
//             this.month[6]=this.month[6]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==7){
//             this.month[7]=this.month[7]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==8){
//             this.month[8]=this.month[8]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==9){
//             this.month[9]=this.month[9]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==10){
//             this.month[10]=this.month[10]+Number(this.bar[i].ProjectedRevenue);
//           }
//           else if(this.bar[i].Month==11){
//             this.month[11]=this.month[11]+Number(this.bar[i].ExpectedRevenue);
//           }
          
//       }
//       console.log(this.month);

      
//       this.chart1 = new Chart('canvas', {
//         type: 'bar',
//         data: {
//           labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
//           datasets: [
//             {
//               data: this.month,
//               borderColor: '#3e95cd',
//               // fill: false,
//               label: 'Monthly Sales',
//               backgroundColor: 'rgba(93, 175, 89, 0.1)',
//               borderWidth: 4,
//             },
//           ],
//         },
        
        
//       });
//       this.chart2 = new Chart('pie', {
//         type: 'pie',
//         data: {
//           labels: ['Professional Services','Education','Transportation','Retail','Software/Hardware','Energy'],
//           datasets: [
//             {
//               data: this.p,
//               borderColor: 'rgb(18, 102, 150)',
//               // fill: false,
//               label: 'Monthly Revenue',
//               backgroundColor: 'rgba(88, 177, 90, 0.2)',
//               borderWidth: 2,
//             },
//           ],
//         },
        
        
//       });
      

      
//     })
//   }
//     selectRegion(value: string) {
//       this.searchValue.set('Region', value);
//       // console.log(this.searchValue,"hi");
//       // this.selectRegion=value;
//       // console.log(this.searchValue);
//       this.filterData();
      
//     }
//     selectYear(value: string) {
//       this.searchValue.set('Year', value);
//       // console.log(this.searchValue);
//       this.filterData();
      
//     }
//     selectIndustry(value: string) {
//       this.searchValue.set('Industry', value);
//       // console.log(this.searchValue);
//       this.filterData();
//     }
//     filterData() {
//       this.result=this.originalData;
//       if (this.searchValue.get('Region') != null) {
//         this.result = this.result.filter((e: { Region: any; }) => e.Region == this.searchValue.get('Region'));
        
//       }
//       if (this.searchValue.get('Year') != null) {
//         this.result = this.result.filter((e: { Year: any; }) => e.Year == this.searchValue.get('Year'));
        
//       }
//       if (this.searchValue.get('Industry') != null) {
//         this.result = this.result.filter(
//           (e: { Industry: any; }) => e.Industry == this.searchValue.get('Industry')
//         );
//       }
//       this.totalRecord=this.result.length;
//     }

// }
