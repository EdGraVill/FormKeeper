/*
  DEFINICIÓN:

    Modelo de controladores para utilizar en el guardado y obtención de información.
*/

// @flow

import Data from '../types/data';

class StorageModel {
  identificador : string;
  data : typeof Data;
  console : {
    log : Function,
  };

  constructor(identificador : string) {
    this.identificador = identificador;
    this.data = this.obtener();
    this.console = console;
  }

  calcularBytes() : number {
    const json : string = JSON.stringify(this.data);

    const m : Array<string> | string | null | typeof undefined = encodeURIComponent(json).match(/%[89ABab]/g);
    return json.length + (m ? m.length : 0);
  }

  info() : { tamaño : number, inputs : number } {
    return {
      tamaño: this.calcularBytes(),
      inputs: this.data.inputs instanceof Array ? this.data.inputs.length : 1,
    };
  }

  guardar(data : typeof Data, callback : Function = this.data.guardarCallback
    ? this.data.guardarCallback
    : () => {
      this.console.log('Información guardada con éxito.');
    }) : void {}

  obtener() : typeof Data {}
}

export default StorageModel;
