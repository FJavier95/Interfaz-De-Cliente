import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html'
})
export class ComparadorComponent implements OnInit {

  id: number;

  //grupo5: Grupo5;
  macetaA: string = '1';
  macetaB: string = '2';
  lineChartData: ChartDataSets[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Macetero 1' },
  { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Macetero 2' }];
  datos: number[] = [];
  datosTotales: number[] = [];
  datosTotales1: number[] = [];
  parametro: any;


  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
 /*   scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        /* {
           id: 'y-axis-1',
           position: 'right',
           gridLines: {
             color: 'rgba(255,0,0,0.3)',
           },
           ticks: {
             fontColor: 'red',
           }
         }
      ]
    },*/
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
  public lineChartColorsGrey: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.3)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(35,83,255,0.2)',
      borderColor: 'rgba(0,37,169,1)',
      pointBackgroundColor: 'rgba(0,37,173,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLabels: Label[] = ['0', '1', '2', '4', '3', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public lineChartLegend = true;
  public lineChartType = 'line';
  //public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private service: UploadService, private _activatedRoute: ActivatedRoute) {
    var d = new Date();
    var n = d.getHours();
    this.service.recuperarClientes().subscribe(result => {
      //Cargo los grupos con sus datos
      for (var i = 0; i < result.length; i++) {
   
      }

    });
  }

  ngOnInit() {
  }
  seleccionarParametro(param: any) {  
    if (param == 1) {
      this.parametro = "Temperatura";
    } else if (param == 2) {
      this.parametro = "Humedad";
    } else if (param == 3) {
      this.parametro = "Calidad del Aire";
    }
  }
/*
  comparar(macetero: string) {
    this.datosTotales.splice(0, this.datosTotales.length)
    this.service.iniciarGrupos().subscribe(result => {
      this.grupos.splice(0,this.grupos.length)
      //Cargo los grupos con sus datos
      for (var i = 0; i < result.length; i++) {
        this.grupos.push(new Grupo(result[i].token, result[i].temperature, result[i].floor_humidity, result[i].air_humidity, result[i].macetero, result[i].co2))
      }
    }); 
    if (this.parametro == "Temperatura") {
      this.grupos.forEach(grupo => {
        if (grupo.macetero == macetero && grupo.temperature.length > 23) {
          for (var i = grupo.temperature.length - 24; i < grupo.temperature.length; i++) {
            this.datosTotales.push(grupo.temperature[i].value);
          }
          this.macetaA = grupo.macetero;
        } else if (grupo.macetero == macetero && grupo.temperature.length <= 23) {
          for (var i = 0; i < grupo.temperature.length - 1; i++) {
            this.datosTotales.push(grupo.temperature[i].value);
          }
          this.macetaA = grupo.macetero;
        }
      });
    }
    if (this.parametro == "Humedad") {
      this.grupos.forEach(grupo => {
        if (grupo.macetero == macetero && grupo.air_humidity.length > 23) {
          for (var i = grupo.air_humidity.length - 24; i < grupo.air_humidity.length; i++) {
            this.datosTotales.push(grupo.air_humidity[i].value);
          }
          this.macetaA = grupo.macetero;
        } else if (grupo.macetero == macetero && grupo.air_humidity.length <= 23) {
          for (var i = 0; i < grupo.air_humidity.length - 1; i++) {
            this.datosTotales.push(grupo.air_humidity[i].value);
          }
          this.macetaA = grupo.macetero;
        }
      });
    }
    if (this.parametro == "Calidad del Aire") {
      this.grupos.forEach(grupo => {
        if (grupo.macetero == macetero && grupo.calidad.length > 23) {
          for (var i = grupo.calidad.length - 24; i < grupo.calidad.length; i++) {
            this.datosTotales.push(grupo.calidad[i].value);
          }
          this.macetaA = grupo.macetero;
        } else if (grupo.macetero == macetero && grupo.calidad.length <= 23) {
          for (var i = 0; i < grupo.calidad.length - 1; i++) {
            this.datosTotales.push(grupo.calidad[i].value);
          }
          this.macetaA = grupo.macetero;
        }
      });
    }
    this.lineChartData = [{ data: this.datosTotales, label: 'Macetero '.concat(this.macetaA) },
    { data: this.datosTotales1, label: 'Macetero '.concat(this.macetaB) }]
  }
  comparar1(macetero: string) {
    this.datosTotales1.splice(0, this.datosTotales1.length)
    this.service.iniciarGrupos().subscribe(result => {
      this.grupos.splice(0,this.grupos.length)
      //Cargo los grupos con sus datos
      for (var i = 0; i < result.length; i++) {
        this.grupos.push(new Grupo(result[i].token, result[i].temperature, result[i].floor_humidity, result[i].air_humidity, result[i].macetero, result[i].co2))
      }
    });
  
    if (this.parametro == "Temperatura") {
      this.grupos.forEach(grupo => {
        if (grupo.macetero == macetero && grupo.temperature.length > 23) {
          for (var i = grupo.temperature.length - 24; i < grupo.temperature.length; i++) {
            this.datosTotales1.push(grupo.temperature[i].value);
          }
          this.macetaB = grupo.macetero;
        } else if (grupo.macetero == macetero && grupo.temperature.length <= 23) {
          for (var i = 0; i < grupo.temperature.length - 1; i++) {
            this.datosTotales1.push(grupo.temperature[i].value);
          }
          this.macetaB = grupo.macetero;
        }
      });
    }
    if (this.parametro == "Humedad") {
      this.grupos.forEach(grupo => {
        if (grupo.macetero == macetero && grupo.air_humidity.length > 23) {
          for (var i = grupo.air_humidity.length - 24; i < grupo.air_humidity.length; i++) {
            this.datosTotales1.push(grupo.air_humidity[i].value);
          }
          this.macetaB = grupo.macetero;
        } else if (grupo.macetero == macetero && grupo.air_humidity.length <= 23) {
          for (var i = 0; i < grupo.air_humidity.length - 1; i++) {
            this.datosTotales1.push(grupo.air_humidity[i].value);
          }
          this.macetaB = grupo.macetero;
        }
      });
    }
    if (this.parametro == "Calidad del Aire") {
      this.grupos.forEach(grupo => {
        if (grupo.macetero == macetero && grupo.calidad.length > 23) {
          for (var i = grupo.calidad.length - 24; i < grupo.calidad.length; i++) {
            this.datosTotales1.push(grupo.calidad[i].value);
          }
          this.macetaB = grupo.macetero;
        } else if (grupo.macetero == macetero && grupo.calidad.length <= 23) {
          for (var i = 0; i < grupo.calidad.length - 1; i++) {
            this.datosTotales1.push(grupo.calidad[i].value);
          }
          this.macetaB = grupo.macetero;
        }
      });
    }
    this.lineChartData = [{ data: this.datosTotales, label: 'Macetero '.concat(this.macetaA) },
    { data: this.datosTotales1, label: 'Macetero '.concat(this.macetaB) }]

  }
*/
}
