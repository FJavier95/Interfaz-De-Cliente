import { Sensor } from './Sensor';

export class Datostabla {
    hora:any;
    valor:any;
    sensor:Sensor;

    constructor(hora, valor,sensor) {
        this.hora = hora;
        this.valor = valor;
        this.sensor = sensor;
    }

}