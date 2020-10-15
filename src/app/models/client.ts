import { Valores } from 'src/app/models/Valores';
import { Sensor } from './Sensor';
export class Client {

    id: Number;

    descripcion: String;

    letra: String;

    thingsboardId: String;

    valores:Valores;

    sensores: Sensor[];

    estado:number;

    constructor(id: Number, descripcion: String, letra: String, thingsboardId: String, valores:Valores, estado:number, sensores: Sensor[]) {
        this.id = id;
        this.descripcion = descripcion;
        this.letra = letra;
        this.thingsboardId = thingsboardId;
        this.valores = valores;
        this.estado = estado;
        this.sensores = sensores;
    }


}