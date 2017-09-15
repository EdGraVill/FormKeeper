// @flow

export type Data = {
  versiones : number,
  version : number,
  autoRestaurar : boolean,
  form : HTMLElement,
  inputs : Array<{
    id : string,
    DOMNode : HTMLElement,
    value : string,
  }> | {
    id : string,
    DOMNode : HTMLElement,
    value : string,
  },
  ignorarDomEls : Array<string>,
  ignorarTipos : Array<string>,
  elementos : Array<string>,
  ignorarElementos: Array<string>,
  encriptacion : boolean,
  guardarCallback: Function,
  restaurarCallback : Function,
  limpiarCallback : Function,
}
