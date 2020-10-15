import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private endPoint: string;
  constructor(private _http: HttpClient) { }
  recuperarClientes(): any {
    this.endPoint = "http://138.4.92.46:8090/api/client";
    return this._http.get(this.endPoint);
  }
  recogerSensoresCliente(cliente: String) {
    this.endPoint = "http://138.4.92.46:8090/api/sensors/client/" + cliente;
    return this._http.get(this.endPoint);
  }
  recogerValoresdeSensor(sensor: string) {
    this.endPoint = "http://138.4.92.46:8090/api/timeLine/" + sensor;
    return this._http.get(this.endPoint);
  }
  iniciarRangos(): any {
    this.endPoint = "http://138.4.92.46:8090/recuperarRangos";
    return this._http.get(this.endPoint);
  }
  cambiarRangos(tempMin, tempMax): any {
    this.endPoint = "http://138.4.92.46:8090/rangos/".concat(tempMin).concat("/").concat(tempMax);
    return this._http.get(this.endPoint);
  }
}
