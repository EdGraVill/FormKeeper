/*
  Definición de URL: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

  DEFINICIÓN:

    Controlador para utilizar URL en el guardado y obtención de información.
*/

// @flow

import Data from '../types/data';
import Model from './storage_model';

class URLStorage extends Model {
  uriSerializado : { [string]: string };

  constructor(identificador : string) {
    super(identificador);

    this.uriSerializado = {};
    this.getURI();
  }

  getURI() : void {
    const uri : Array<string> = window.location.search.replace('?', '').split('&');

    uri.forEach((el) => {
      const separado : Array<string> = el.split('=');

      const [key : string, value : string] = separado;

      this.uriSerializado[key] = value;
    });
  }

  guardar(data : typeof Data, callback : Function = this.data.guardarCallback
    ? this.data.guardarCallback
    : () => {
      this.console.log('Información guardada con éxito.');
    }) : void {
    this.getURI();

    const uriData : string = encodeURI(JSON.stringify(data));

    const obj : { [string]: string } = {};
    obj[this.identificador] = uriData;

    const nuevoObj : { [string] : string } = Object.assign({}, this.uriSerializado, obj);

    let string : string = '?';
    Object.keys(nuevoObj).forEach((key, i, k) => {
      if (k.length === i + 1) string += `${key}=${nuevoObj[key]}`;
      string += `${key}=${nuevoObj[key]}&`;
    });

    const { pathname } = window.location;

    const url = `${pathname}${string}`;

    window.history.replaceState(data, document.title, url);

    callback();
  }

  obtener() : typeof Data {
    this.getURI();

    const data : typeof Data = this.uriSerializado[this.identificador]
      ? JSON.parse(decodeURI(this.uriSerializado[this.identificador]))
      : {};

    return data;
  }
}

export default URLStorage;
