import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sensor } from 'src/app/models/Sensor';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Datostabla } from 'src/app/models/DatosTabla';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { UploadService } from 'src/app/services/upload.service';
import { TimeLine } from 'src/app/models/TimeLine';

@Component({
  selector: 'app-grafica-luminosidad',
  templateUrl: './grafica-luminosidad.component.html' 
})
export class GraficaLuminosidadComponent implements OnInit {
  cliente: string;
  sensores: Sensor[] = [];
  lineChartData: ChartDataSets[] = [{}];
  datosGrafica: number[] = [];
  nombre: string;
  sensorId: string;
  datosTabla: Datostabla[] = [];
  insante;
  hour;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  public lineChartLegend = false;
  public lineChartType = 'line';
  
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private service: UploadService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.insante = new Date();
    this.hour = this.insante.getHours();
    this._activatedRoute.params.subscribe(params => {
      this.cliente = params['id'];
    })
    var promise = new Promise((resolve, reject) => {
      this.service.recogerSensoresCliente(this.cliente).subscribe((response: Sensor[]) => {
        response.forEach(sensor => {
          this.sensores.push(sensor);
          resolve();
        });
      })
    });
    promise.then(() => {
      this.sensores.forEach(sensor => {
        if (sensor.tipoSensorId == 'Luminosidad') {
          this.service.recogerValoresdeSensor(sensor.id).toPromise().then((result: TimeLine[]) => {
            this.datosGrafica.splice(0, this.datosGrafica.length);
            result.forEach(timeline => {
              this.datosGrafica.push(timeline.valor);
              this.datosTabla.push(new Datostabla(timeline.fecha, timeline.valor, timeline.sensor));              
            });
            this.lineChartData.push({ data: this.datosGrafica, label: this.nombre });
          })
        }
      });
    });
  }


  ngOnInit(): void {    
   
  }

}
