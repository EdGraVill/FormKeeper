/*
  Definición de cookie: https://developer.mozilla.org/es/docs/DOM/document.cookie

  DEFINICIÓN:

    Controlador para utilizar cookies en el guardado y obtención de información.
*/

// @flow

import Data from '../types/data';

import Model from './storage_model';

class LocalStorage extends Model {
  cookies : { [string]: string };

  constructor(identificador : string) {
    super(identificador);

    this.cookies = {};
    this.getCookies();
  }

  getCookies() : void {
    const stringCookies : Array<string> = document.cookie ? document.cookie.split('; ') : [];

    stringCookies.forEach((el) => {
      const separado : Array<string> = el.split('=');

      const [key : string, value : string] = separado;

      this.cookies[key] = value;
    });
  }

  guardar(data : typeof Data, callback : Function = this.data.guardarCallback
    ? this.data.guardarCallback
    : () => {
      this.console.log('Información guardada con éxito.');
    }) : void {
    this.getCookies();

    const cookieData : string = JSON.stringify(data);

    const obj : { [string]: string } = {};
    obj[this.identificador] = cookieData;

    const nuevoObj : { [string] : string } = Object.assign({}, this.cookies, obj);

    let string : string = '';
    Object.keys(nuevoObj).forEach((key, i, k) => {
      if (k.length === i + 1) string += `${key}=${nuevoObj[key]}`;
      string += `${key}=${nuevoObj[key]}; `;
    });

    document.cookie = string;

    callback();
  }

  obtener() : typeof Data {
    this.getCookies();

    const data : typeof Data = this.cookies[this.identificador]
      ? JSON.parse(this.cookies[this.identificador])
      : {};

    return data;
  }
}

export default LocalStorage;
