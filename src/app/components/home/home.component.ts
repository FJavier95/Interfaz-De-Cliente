import { Component } from '@angular/core';
import { Router, } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service'
import { tipoSensor } from 'src/app/models/tipoSensor';

import { Rango } from '../../models/Rango';
import { Client } from 'src/app/models/client';
import { Valores } from 'src/app/models/Valores';
import { Sensor } from 'src/app/models/Sensor';
import { TimeLine } from 'src/app/models/TimeLine';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  clients: Client[] = [];
  tipos: tipoSensor = new tipoSensor();
  tablas: number;
  columnas: number[] = []
  sensores: Sensor[] = [];
  temperaturaProgreso: number;
  luminosidadProgreso: number;
  calidadProgreso: number;
  humedadProgreso: number;
  sumas: number[] = [0, 0, 0, 0];
  temperatura: number[] = [];
  luminosidad: number[] = [];
  calidad: number[] = [];
  humedad: number[] = [];
  cliente: Client;

  constructor(private _router: Router, private service: UploadService) {

    this.recuperarClientes();

    setTimeout(() => this.clients.forEach(client => {
      this.service.recogerSensoresCliente(client.thingsboardId).subscribe((response: Sensor[]) => {
        response.forEach(sensor => {
          client.sensores.push(sensor);

        });
      })
    }), 2000)

    setTimeout(() =>
      this.clients.forEach(client => {
        if (!(client.sensores.length == 0)) {
          client.sensores.forEach(sensor => {
            this.service.recogerValoresdeSensor(sensor.id).toPromise().then((result: TimeLine[]) => {
              if (!(result.length == 0)) {
                for (let i = 0; i < 5; i++) {
                  if (result[i].sensor.tipoSensorId == 'Humedad Ambiental' || result[i].sensor.tipoSensorId == 'Humedad Superficie') {
                    this.humedad.push(result[i].valor);
                    this.sumas[0] = this.sumas[0] + +result[i].valor;
                    var element = document.getElementById("humedadProgreso");
                    element.style.height = '20rem';
                    this.humedadProgreso = this.sumas[0] / this.humedad.length;
                    element.style.width = this.humedadProgreso + '%';
                  }
                  if (result[i].sensor.tipoSensorId == 'Temperatura Ambiental' || result[i].sensor.tipoSensorId == 'Temperatura Superficie') {
                    this.temperatura.push(result[i].valor);
                    this.sumas[1] = this.sumas[1] + +result[i].valor
                    var element = document.getElementById("temperaturaProgreso");
                    element.style.height = '20rem';
                    this.temperaturaProgreso = this.sumas[1] / this.temperatura.length;
                    element.style.width = this.temperaturaProgreso + '%';
                  }
                  if (result[i].sensor.tipoSensorId == 'Co2' && result[i].valor != 449) {
                    var valor = ((2000 - result[i].valor) * 100) / 1550;
                    this.calidad.push(result[i].valor);
                    this.sumas[2] = this.sumas[2] + +result[i].valor;
                    var element = document.getElementById("calidadProgreso");
                    element.style.height = '20rem';
                    this.calidadProgreso = this.sumas[2] / this.calidad.length;
                    element.style.width = this.calidadProgreso + '%';
                  }
                  if (result[i].sensor.tipoSensorId == 'Luminosidad') {
                    this.luminosidad.push(result[i].valor);
                    this.sumas[3] = this.sumas[3] + +result[i].valor;
                    var element = document.getElementById("luminosidadProgreso");
                    element.style.height = '20rem';
                    this.luminosidadProgreso = this.sumas[3] / this.luminosidad.length;
                    element.style.width = this.luminosidadProgreso + '%';
                  }
                }
              }
            });
          });
        }
        //Llamar a la funcion para evaluar el estado de cada cliente
      }), 5000)
  }

  ngOnInit() {
  }


  buscadorClientes(identificador: String) {
    for (var i = 0; i < this.clients.length; i++)
      if (this.clients[i].thingsboardId === identificador) {
        return this.clients[i];
      }

  }
  recuperarClientes() {
    return new Promise((resolve, reject) => {
      this.service.recuperarClientes().subscribe((clientes: any[]) => {
        for (var i = 0; i < clientes.length; i++) {
          var sensores: Sensor[] = [];
          let cliente = new Client(clientes[i].id, clientes[i].descripcion, clientes[i].letra, clientes[i].thingsboardId, new Valores(), 2, sensores);
          this.clients.push(cliente);
          if ((i % 3) === 0) {
            this.columnas.push(i);
          }
        }
        this.tablas = Math.ceil(this.clients.length / 3);
        resolve();
      },
        err => console.log("El ERROR producido", err),
      );
    });

  }

  graficaTemperatura(cliente: string) {
    this._router.navigate(['/graficaTemperatura', cliente]);
  }
  graficaHumedad(cliente: string) {
    this._router.navigate(['/graficaHumedad', cliente]);
  }
  graficaCalidad(cliente: string) {
    this._router.navigate(['/graficaCalidad', cliente]);
  }
  graficaLuminosidad(cliente: string) {
    this._router.navigate(['/graficaLuminosidad', cliente]);
  }

}
