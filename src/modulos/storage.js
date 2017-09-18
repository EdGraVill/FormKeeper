/*
  DEFINICIÓN:

    Controlador para el guardado y obtención de información con diferentes formas de hacerlo.
*/

// @flow

import Data from '../types/data';

import LocalStorage from './storage_localStorage';
import URLStorage from './storage_urlStorage';
import Cookie from './storage_cookie';
import Model from './storage_model';

class Storage extends Model {
  storage : Model;

  constructor(identificador : string) {
    super(identificador);

    if (window.localStorage) {
      this.storage = new LocalStorage(this.identificador);
    } else if (document.cookie) {
      this.storage = new Cookie(this.identificador);
    } else {
      this.storage = new URLStorage(this.identificador);
    }

    this.data = this.storage.data;
  }

  guardar(data : typeof Data, callback : Function = this.data.guardarCallback
    ? this.data.guardarCallback
    : () => {
      this.console.log('Información guardada con éxito.');
    }) : void {
    this.storage.guardar(data, callback);
  }

  obtener() : typeof Data {
    return this.storage.obtener();
  }
}

export default Storage;
