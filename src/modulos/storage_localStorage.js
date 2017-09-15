/*
  Definición de localStorage: https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

  DEFINICIÓN:

    Controlador para utilizar localStorage en el guardado y obtención de información.
*/

// @flow

import Data from '../types/data';

function calcularBytes(json : string) : number {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  const m : Array<string> | string | null | typeof undefined = encodeURIComponent(json).match(/%[89ABab]/g);
  return json.length + (m ? m.length : 0);
}

class LocalStorage {
  indentificador : string;
  data : typeof Data;
  console : {
    log : Function,
  };

  constructor(indentificador : string) {
    this.indentificador = indentificador;
    this.data = JSON.parse(window.localStorage.getItem(this.indentificador));
    this.console = console;
  }

  info() : { tamaño : number, inputs : number } {
    const json : string = window.localStorage.getItem(this.indentificador);

    const tamaño : number = calcularBytes(json);

    this.data = JSON.parse(json);

    return {
      tamaño,
      inputs: this.data.inputs instanceof Array ? this.data.inputs.length : 1,
    };
  }

  guardar(data : typeof Data, callback : Function = this.data.guardarCallback
    ? this.data.guardarCallback
    : () => {
      this.console.log('Información guardada con éxito.');
    }) : void {
    const json : string = JSON.stringify(data);

    window.localStorage.setItem(this.indentificador, json);

    callback();
  }

  obtener() : typeof Data {
    return JSON.parse(window.localStorage.getItem(this.indentificador));
  }
}

export default LocalStorage;
