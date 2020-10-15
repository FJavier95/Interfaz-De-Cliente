export class tipoSensor {

    tipos: String[]=["agua","peso","humedad_tierra","temperatura_interior","humedad_ambiental","luz_ambiental","temperatura_ambiental","Co2"];

getTipo(){
    return this.tipos;
}
}