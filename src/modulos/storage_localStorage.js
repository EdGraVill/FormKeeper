/*
  Definición de localStorage: https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

  DEFINICIÓN:

    Controlador para utilizar localStorage en el guardado y obtención de información.
*/

// @flow

import Data from '../types/data';

import Model from './storage_model';

class LocalStorage extends Model {
  guardar(data : typeof Data, callback : Function = this.data.guardarCallback
    ? this.data.guardarCallback
    : () => {
      this.console.log('Información guardada con éxito.');
    }) : void {
    const json : string = JSON.stringify(data);

    window.localStorage.setItem(this.identificador, json);

    callback();
  }

  obtener() : typeof Data {
    const data : string | null = window.localStorage.getItem(this.identificador);

    if (data === null) return {};

    return JSON.parse(data);
  }
}

export default LocalStorage;
