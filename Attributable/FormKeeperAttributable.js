/*
 *
 * FormKeeper
 * Versión: 1.3.x
 * Repositorio: https://github.com/EdGraVill/FormKeeper
 * Licencia: General Public Licence 3.0
 * Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end.
 * 3 Versiones: Completa, Lite y Attributable.
 * Changelog al pie del código.
 *
 */

// La función puede recibir como primer parámetro el "id" del form, o un "DOM Element"
class FormKeeper {
  constructor (f, s) {
    'use strict'

    // Si la función no recibe como primer parámetro el "id" del form a guardar, la función se cancela y se imprime por consola el error.
    if (!f) return console.error('Para ejecutar FormKeeper adecuadamente, debe indicar en el primer parámetro la información nesesaria para poder trabajar. Para más información, consulte la documentación en: https://github.com/EdGraVill/formKeeper')

    // Si el segundo parámetro que recibe la función no es un booleano, la opción de enriptado se mantiene activada, pero se imprime por consola una advertencia de la situación.
    if (typeof s !== 'boolean' && s !== undefined) console.warn('El segundo parámetro sólo admite un valor de tipo boleando (true / false), esto para indicar si desea que FormKeeper mantenga encriptada la información que guarda. Por defecto, el sistema de encriptación está activado')

    // Objeto con las opciones por defecto
    const fkDefault = {
      domEl: '',
      domEls: [],
      ignorarDomEls: [],
      ignorarTipos: [
        'submit',
        'reset',
        'button',
        'file',
        'image'
      ],
      elementos: [
        'INPUT',
        'SELECT',
        'TEXTAREA',
        'DATALIST'
      ],
      ignorarElementos: [],
      // En la opción de encriptación, si no recibe nada por segundo parámetro, o lo que recibe no es un boleano, la declara como "tru"; en caso contrario, le asigna el valor del segundo parámetro. Lo anterior, claro, a menos que en el primer parámetro reciba un objeto donde se le asigna un valor a f.encriptado.
      encriptado: s === undefined || typeof s !== 'boolean' ? true : s,
      restaurarDefault: false,
      restaurarCallback: () => {
        console.log('Elementos restaurados con éxito.')
      },
      limpiarCallback: () => {
        console.log('FormKeeper limpiado con éxito.')
      }
    }

    // Si el primer parámetro es un objeto, se comprueba que el valor para la opción de encriptado se el adecuado.
    if (typeof f.encriptado !== 'undefined' && typeof f.encriptado !== 'boolean') console.warn('La opción "encriptado" sólo admite un valor de tipo boleando (true / false), esto para indicar si desea que FormKeeper mantenga encriptada la información que guarda. Por defecto, el sistema de encriptación está activado')
    if (typeof f === 'object' && f instanceof Array === false) f.encriptado = typeof f.encriptado !== 'undefined' && typeof f.encriptado !== 'boolean' ? true : f.encriptado

    // Se genera el objeto con el que se va a trabajar a lo largo de la ejecución.
    const fk = f instanceof Array ? fkDefault : typeof f !== 'object' ? fkDefault : Object.assign(fkDefault, f)

    // Procesar los domEls que serán ignorados
    for (let i = 0; i < fk.ignorarDomEls.length; i++) {
      fk.ignorarDomEls[i] = fk.ignorarDomEls[i] instanceof window.HTMLElement ? fk.ignorarDomEls[i] : document.getElementById(fk.ignorarDomEls[i])
    }

    // Se procesa el domEl con el que se va a trabajar.
    fk.domEl = f instanceof window.HTMLElement ? f : typeof f === 'string' ? document.getElementById(f) : f instanceof Array ? f : typeof f === 'object' ? typeof f.domEl === 'string' ? document.getElementById(f.domEl) : f.domEl : null

    // Si la información recibida por el primer parámetro es incorrecta, detiene la ejecución.
    if (fk.domEl === null || fk.domEl === undefined) return console.error('Ha ocurrido un error al intentar interpretar la información del DOM Element con el que se iba a trabajar.')

    // Si se recibe un array, procesarlo para poderlo trabajar.
    if (fk.domEl instanceof Array) {
      for (let i = 0; i < fk.domEl.length; i++) {
        fk.domEls[i] = fk.domEl[i] instanceof window.HTMLElement ? fk.domEl[i] : document.getElementById(fk.domEl[i])
      }
      fk.domEl = 'array'
    } else if (fk.domEl.childNodes.length === 0) {
      // Si no es ni un array o un elemento contenedor, entonces es un input individual.
      fk.domEls = [fk.domEl]
      fk.domEl = 'individual'
    } else if (fk.domEl.childNodes.length > 0) {
      // Si recibe un contenedor (div o form), obtiene todos los domEls de dentro, excepto los que se marquen por parámetro como ignorados.
      const hijos = fk.domEl.childNodes

      for (let i = 0; i < hijos.length; i++) {
        if (fk.elementos.indexOf(hijos[i].tagName) >= 0 && fk.ignorarElementos.indexOf(hijos[i].tagName) === -1 && fk.ignorarTipos.indexOf(hijos[i].type) === -1 && fk.ignorarDomEls.indexOf(hijos[i]) === -1) {
          fk.domEls.push(hijos[i])
        }
      }
    } else {
      // Si no es ninguo de los anteriores, muy probáblemente no es un elemento válido.
      return console.error('Ha ocurrido un error al intentar interpretar la información del DOM Element con el que se iba a trabajar.')
    }

    // Agregar el identificador único con el que evitaremos repetir o ingresar datos en el lugar que no corresponden.
    fk.identificador = typeof fk.domEl === 'string' ? this.encode(`${window.location.href} - ${this.getPathTo(fk.domEls[0])}`) : this.encode(`${window.location.href} - ${this.getPathTo(fk.domEl)}`)

    // Se tratan los inputs de tipo radio.
    const objRds = {}
    for (let i = 0; i < fk.domEls.length; i++) {
      const thisDomEl = fk.domEls[i]
      if (thisDomEl.type === 'radio') {
        if (!objRds[thisDomEl.name]) objRds[thisDomEl.name] = []
        objRds[thisDomEl.name].push(thisDomEl)
      }
    }

    // Se ordenan dentro de un array todos los grupos de inputs radio.
    for (let i = 0; i < fk.domEls.length; i++) {
      const thisDomEl = fk.domEls[i]
      if (thisDomEl.type === 'radio') {
        const thsNm = thisDomEl.name
        fk.domEls[i] = objRds[thsNm]
        fk.domEls.splice(i + 1, objRds[thsNm].length - 1)
      }
    }

    // Se agregan los "event-listeners" a cada domel dependiendo de su naturaleza
    for (let i = 0; i < fk.domEls.length; i++) {
      const thisDomEl = fk.domEls[i]
      if (thisDomEl.tagName === 'INPUT' || thisDomEl.tagName === 'TEXTAREA') {
        if (thisDomEl.type === 'checkbox') {
          thisDomEl.setAttribute('onchange', `FormKeeper.saveValue(${i}, this.checked, '${fk.identificador}', ${fk.encriptado})`)
        } else if (thisDomEl.type === 'range' || thisDomEl.type === 'color') {
          thisDomEl.setAttribute('onchange', `FormKeeper.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
        } else if (thisDomEl.type === 'text' || thisDomEl.type === 'password' || thisDomEl.type === 'email' || thisDomEl.type === 'search' || thisDomEl.type === 'url' || thisDomEl.tagName === 'TEXTAREA') {
          thisDomEl.setAttribute('onkeyup', `FormKeeper.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
        } else {
          thisDomEl.setAttribute('onkeyup', `FormKeeper.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
          thisDomEl.setAttribute('onchange', `FormKeeper.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
        }
      } else if (thisDomEl instanceof Array) {
        for (let j = 0; j < thisDomEl.length; j++) {
          thisDomEl[j].setAttribute('onchange', `FormKeeper.saveRadio(${i}, this.checked, '${fk.identificador}', ${fk.encriptado}, [${thisDomEl.length},${j}])`)
        }
      } else {
        thisDomEl.setAttribute('onchange', `FormKeeper.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
      }
    }

    this.estructura = fk

    // Si el usuario desea auto restaurar los elementos, ejecutar la función de restaurar
    if (fk.restaurarDefault) this.restaurar()
  }
  getPathTo (element) {
    if (element.id !== '') return `id("${element.id}")`
    if (element === document.body) return element.tagName

    let ix = 0
    let siblings = element.parentNode.childNodes
    for (let i = 0; i < siblings.length; i++) {
      var sibling = siblings[i]
      if (sibling === element) return `${this.getPathTo(element.parentNode)}/${element.tagName}[${ix + 1}]`
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
    }
  }
  static saveValue (index, domElValue, identificador, encriptado) {
    if (encriptado) {
      const bjtFormKeeper = window.localStorage.getItem('FormKeeper') !== null ? JSON.parse(this.prototype.decode(window.localStorage.getItem('FormKeeper'))) : {}

      bjtFormKeeper[identificador] = bjtFormKeeper[identificador] ? bjtFormKeeper[identificador] : []

      bjtFormKeeper[identificador][index] = domElValue

      const readyToSend = this.prototype.encode(JSON.stringify(bjtFormKeeper))

      window.localStorage.setItem('FormKeeper', readyToSend)
    } else {
      window.localStorage.setItem(`${identificador + index}`, domElValue)
    }
  }
  static saveRadio (index, domElValue, identificador, encriptado, info) {
    if (encriptado) {
      const bjtFormKeeper = window.localStorage.getItem('FormKeeper') !== null ? JSON.parse(this.prototype.decode(window.localStorage.getItem('FormKeeper'))) : {}

      bjtFormKeeper[identificador] = bjtFormKeeper[identificador] ? bjtFormKeeper[identificador] : []

      bjtFormKeeper[identificador][index] = bjtFormKeeper[identificador][index] ? bjtFormKeeper[identificador][index] : []

      for (let i = 0; i < info[0]; i++) {
        bjtFormKeeper[identificador][index][i] = false
      }

      bjtFormKeeper[identificador][index][info[1]] = domElValue

      const readyToSend = this.prototype.encode(JSON.stringify(bjtFormKeeper))

      window.localStorage.setItem('FormKeeper', readyToSend)
    } else {
      const radio = window.localStorage.getItem(`${identificador + index}`) !== null ? window.localStorage.getItem(`${identificador + index}`).split(',') : []

      for (let i = 0; i < info[0]; i++) {
        radio[i] = false
      }

      radio[info[1]] = domElValue

      window.localStorage.setItem(`${identificador + index}`, radio)
    }
  }
  restaurar (cb) {
    const promesa = new Promise((resolve, reject) => {
      if (this.estructura.encriptado) {
        const bjtFormKeeper = window.localStorage.getItem('FormKeeper') !== null ? JSON.parse(this.decode(window.localStorage.getItem('FormKeeper'))) : null

        if (bjtFormKeeper === null) reject('No hay elementos que restaurar en este momento.')

        for (let i = 0; i < this.estructura.domEls.length; i++) {
          const thisDomEl = this.estructura.domEls[i]
          if (thisDomEl instanceof Array && bjtFormKeeper[this.estructura.identificador][i] !== undefined && bjtFormKeeper[this.estructura.identificador][i] !== null) {
            for (let j = 0; j < thisDomEl.length; j++) {
              if (bjtFormKeeper[this.estructura.identificador][i][j] === true) {
                thisDomEl[j].checked = true
              }
            }
          } else if (thisDomEl.type === 'checkbox') {
            thisDomEl.checked = bjtFormKeeper[this.estructura.identificador][i] ? bjtFormKeeper[this.estructura.identificador][i] : false
          } else {
            thisDomEl.value = bjtFormKeeper[this.estructura.identificador][i] ? bjtFormKeeper[this.estructura.identificador][i] : ''
          }
        }
      } else {
        const lCmbs = []
        for (let item in window.localStorage) {
          if (item.includes(this.estructura.identificador)) lCmbs[item.replace(this.estructura.identificador, '')] = window.localStorage.getItem(item).includes(',') ? window.localStorage.getItem(item).split(',') : window.localStorage.getItem(item)
        }

        if (lCmbs.length === 0) reject('No hay elementos que restaurar en este momento.')

        for (let i = 0; i < this.estructura.domEls.length; i++) {
          const thisDomEl = this.estructura.domEls[i]
          if (thisDomEl instanceof Array) {
            for (let j = 0; j < thisDomEl.length; j++) {
              if (lCmbs[i][j] === 'true') {
                thisDomEl[j].checked = true
              }
            }
          } else if (thisDomEl.type === 'checkbox') {
            thisDomEl.checked = lCmbs[i] ? lCmbs[i] : false
          } else {
            thisDomEl.value = lCmbs[i] ? lCmbs[i] : ''
          }
        }
      }
      resolve(this.estructura.restaurarCallback)
    })

    promesa.then((callback) => {
      if (cb !== undefined && this.isFunction(cb)) cb.call()
      if (cb === undefined) callback.call()
    }, (error) => {
      console.warn(error)
    })
  }
  limpiar (cb, ask) {
    
  }
  // Método estático para limpiar toda la información que esté almacenada por la librería entera
  static limpiar (cb, ask) {
    const cnfrm = typeof ask === 'string' ? window.confirm(ask) : ask === 'true' || ask !== undefined ? window.confirm('¿Desea eliminar toda la información guardada por FormKeeper?') : true

    const promesa = new Promise((resolve, reject) => {
      if (cnfrm) {
        window.localStorage.removeItem('FormKeeper')
        resolve(this.estructura.limpiarCallback)
      } else {
        reject('Los datos siguen a salvo.')
      }
    })

    promesa.then((callback) => {
      if (cb !== undefined && this.isFunction(cb)) cb.call()
      if (cb === undefined) callback.call()
    }, (error) => {
      console.log(error)
    })
  }
  // Encriptador adaptado de: http://hdeleon.net/codificar-y-decodificar-base64-en-javascript/ GRACIAS!!!
  _keyStr () {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }
  encode (e) {
    let t = ''
    let n, r, i, s, o, u, a
    let f = 0
    e = this.utf8Encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = (n & 3) << 4 | r >> 4
      u = (r & 15) << 2 | i >> 6
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr().charAt(s) + this._keyStr().charAt(o) + this._keyStr().charAt(u) + this._keyStr().charAt(a)
    }
    return t
  }
  decode (e) {
    let t = ''
    let n, r, i
    let s, o, u, a
    let f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr().indexOf(e.charAt(f++))
      o = this._keyStr().indexOf(e.charAt(f++))
      u = this._keyStr().indexOf(e.charAt(f++))
      a = this._keyStr().indexOf(e.charAt(f++))
      n = s << 2 | o >> 4
      r = (o & 15) << 4 | u >> 2
      i = (u & 3) << 6 | a
      t = t + String.fromCharCode(n)
      if (u !== 64) t = t + String.fromCharCode(r)
      if (a !== 64) t = t + String.fromCharCode(i)
    }
    t = this.utf8Decode(t)
    return t
  }
  utf8Encode (e) {
    e = e.replace(/rn/g, 'n')
    let t = ''
    for (let n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192)
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224)
        t += String.fromCharCode(r >> 6 & 63 | 128)
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  }
  utf8Decode (e) {
    let t = ''
    let n = 0
    let r = 0
    let c2 = 0
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode((r & 31) << 6 | c2 & 63)
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        let c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        n += 3
      }
    }
    return t
  }
  isFunction (functionToCheck) {
    const getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
  }
}

/*
 *
 * Lista de cambios (Changelog):
 *
 * - ¡NUEVO! Sitio Web Demostrativo
 *
 * - (DESARROLLO) Watch switcheable por parámetro con gulp
 *
 * - Algunos fallos arreglados
 *
 */

/*
 *
 * FormKeeper
 * Versión: 1.3.x
 * Repositorio: https://github.com/EdGraVill/FormKeeper
 * Licencia: General Public Licence 3.0
 * Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end.
 * 3 Versiones: Completa, Lite y Attributable.
 * Changelog al pie del código.
 *
 */

// La función puede recibir como primer parámetro el "id" del form, o un "DOM Element"
class FormKeeperLite {
  constructor (f) {
    'use strict'

    // Si la función no recibe como primer parámetro el "id" del form a guardar, la función se cancela y se imprime por consola el error.
    if (!f) return console.error('Para ejecutar FormKeeperLite adecuadamente, debe indicar por parámetro el id de un form, un elemento individual o un Array con una lista de elementos individuales. Para más información, consulte la documentación en: https://github.com/EdGraVill/formKeeper')

    // Objeto con las opciones por defecto
    const fk = {
      domEl: '',
      domEls: [],
      ignorarTipos: [
        'submit',
        'reset',
        'button',
        'file',
        'image'
      ],
      elementos: [
        'INPUT',
        'SELECT',
        'TEXTAREA',
        'DATALIST'
      ],
      restaurarCallback: () => {
        console.log('Elementos restaurados con éxito.')
      },
      limpiarCallback: () => {
        console.log('FormKeeper limpiado con éxito.')
      }
    }

    // Se procesa el domEl con el que se va a trabajar.
    fk.domEl = f instanceof window.HTMLElement ? f : typeof f === 'string' ? document.getElementById(f) : f instanceof Array ? f : typeof f === 'object' ? false : null

    // Error si se está intentando acceder a funciones avanzadas
    if (!fk.domEl) return console.error('Al parecer está intentando acceder a funciones avanzadas. Esta es una versión Lite, si quiere más opciones, puede utilizar FormKeeperLite: https://github.com/EdGraVill/FormKeeperLite')

    // Si la información recibida por el primer parámetro es incorrecta, detiene la ejecución.
    if (fk.domEl === null || fk.domEl === undefined) return console.error('Ha ocurrido un error al intentar interpretar la información del DOM Element con el que se iba a trabajar.')

    // Si se recibe un array, procesarlo para poderlo trabajar.
    if (fk.domEl instanceof Array) {
      for (let i = 0; i < fk.domEl.length; i++) {
        fk.domEls[i] = fk.domEl[i] instanceof window.HTMLElement ? fk.domEl[i] : document.getElementById(fk.domEl[i])
      }
      fk.domEl = 'array'
    } else if (fk.domEl.childNodes.length === 0) {
      // Si no es ni un array o un elemento contenedor, entonces es un input individual.
      fk.domEls = [fk.domEl]
      fk.domEl = 'individual'
    } else if (fk.domEl.childNodes.length > 0) {
      // Si recibe un contenedor (div o form), obtiene todos los domEls de dentro, excepto los que se marquen por parámetro como ignorados.
      const hijos = fk.domEl.childNodes

      for (let i = 0; i < hijos.length; i++) {
        if (fk.elementos.indexOf(hijos[i].tagName) >= 0 && fk.ignorarTipos.indexOf(hijos[i].type) === -1) {
          fk.domEls.push(hijos[i])
        }
      }
    } else {
      // Si no es ninguo de los anteriores, muy probáblemente no es un elemento válido.
      return console.error('Ha ocurrido un error al intentar interpretar la información del DOM Element con el que se iba a trabajar.')
    }

    // Agregar el identificador único con el que evitaremos repetir o ingresar datos en el lugar que no corresponden.
    fk.identificador = typeof fk.domEl === 'string' ? this.encode(`${window.location.href} - ${this.getPathTo(fk.domEls[0])}`) : this.encode(`${window.location.href} - ${this.getPathTo(fk.domEl)}`)

    // Se tratan los inputs de tipo radio.
    const objRds = {}
    for (let i = 0; i < fk.domEls.length; i++) {
      const thisDomEl = fk.domEls[i]
      if (thisDomEl.type === 'radio') {
        if (!objRds[thisDomEl.name]) objRds[thisDomEl.name] = []
        objRds[thisDomEl.name].push(thisDomEl)
      }
    }

    // Se ordenan dentro de un array todos los grupos de inputs radio.
    for (let i = 0; i < fk.domEls.length; i++) {
      const thisDomEl = fk.domEls[i]
      if (thisDomEl.type === 'radio') {
        const thsNm = thisDomEl.name
        fk.domEls[i] = objRds[thsNm]
        fk.domEls.splice(i + 1, objRds[thsNm].length - 1)
      }
    }

    // Se agregan los "event-listeners" a cada domel dependiendo de su naturaleza
    for (let i = 0; i < fk.domEls.length; i++) {
      const thisDomEl = fk.domEls[i]
      if (thisDomEl.tagName === 'INPUT' || thisDomEl.tagName === 'TEXTAREA') {
        if (thisDomEl.type === 'checkbox') {
          thisDomEl.setAttribute('onchange', `FormKeeperLite.saveValue(${i}, this.checked, '${fk.identificador}')`)
        } else if (thisDomEl.type === 'range' || thisDomEl.type === 'color') {
          thisDomEl.setAttribute('onchange', `FormKeeperLite.saveValue(${i}, this.value, '${fk.identificador}')`)
        } else if (thisDomEl.type === 'text' || thisDomEl.type === 'password' || thisDomEl.type === 'email' || thisDomEl.type === 'search' || thisDomEl.type === 'url' || thisDomEl.tagName === 'TEXTAREA') {
          thisDomEl.setAttribute('onkeyup', `FormKeeperLite.saveValue(${i}, this.value, '${fk.identificador}')`)
        } else {
          thisDomEl.setAttribute('onkeyup', `FormKeeperLite.saveValue(${i}, this.value, '${fk.identificador}')`)
          thisDomEl.setAttribute('onchange', `FormKeeperLite.saveValue(${i}, this.value, '${fk.identificador}')`)
        }
      } else if (thisDomEl instanceof Array) {
        for (let j = 0; j < thisDomEl.length; j++) {
          thisDomEl[j].setAttribute('onchange', `FormKeeperLite.saveRadio(${i}, this.checked, '${fk.identificador}', [${thisDomEl.length},${j}])`)
        }
      } else {
        thisDomEl.setAttribute('onchange', `FormKeeperLite.saveValue(${i}, this.value, '${fk.identificador}')`)
      }
    }

    this.estructura = fk

    // Si el usuario desea auto restaurar los elementos, ejecutar la función de restaurar
    this.restaurar()
  }
  getPathTo (element) {
    if (element.id !== '') return `id("${element.id}")`
    if (element === document.body) return element.tagName

    let ix = 0
    let siblings = element.parentNode.childNodes
    for (let i = 0; i < siblings.length; i++) {
      var sibling = siblings[i]
      if (sibling === element) return `${this.getPathTo(element.parentNode)}/${element.tagName}[${ix + 1}]`
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
    }
  }
  static saveValue (index, domElValue, identificador) {
    const bjtFormKeeper = window.localStorage.getItem('FormKeeperLite') !== null ? JSON.parse(this.prototype.decode(window.localStorage.getItem('FormKeeperLite'))) : {}

    bjtFormKeeper[identificador] = bjtFormKeeper[identificador] ? bjtFormKeeper[identificador] : []

    bjtFormKeeper[identificador][index] = domElValue

    const readyToSend = this.prototype.encode(JSON.stringify(bjtFormKeeper))

    window.localStorage.setItem('FormKeeperLite', readyToSend)
  }
  static saveRadio (index, domElValue, identificador, info) {
    const bjtFormKeeper = window.localStorage.getItem('FormKeeperLite') !== null ? JSON.parse(this.prototype.decode(window.localStorage.getItem('FormKeeperLite'))) : {}

    bjtFormKeeper[identificador] = bjtFormKeeper[identificador] ? bjtFormKeeper[identificador] : []

    bjtFormKeeper[identificador][index] = bjtFormKeeper[identificador][index] ? bjtFormKeeper[identificador][index] : []

    for (let i = 0; i < info[0]; i++) {
      bjtFormKeeper[identificador][index][i] = false
    }

    bjtFormKeeper[identificador][index][info[1]] = domElValue

    const readyToSend = this.prototype.encode(JSON.stringify(bjtFormKeeper))

    window.localStorage.setItem('FormKeeperLite', readyToSend)
  }
  restaurar (cb) {
    const promesa = new Promise((resolve, reject) => {
      const bjtFormKeeper = window.localStorage.getItem('FormKeeperLite') !== null ? JSON.parse(this.decode(window.localStorage.getItem('FormKeeperLite'))) : null

      if (bjtFormKeeper === null) reject('No hay elementos que restaurar en este momento.')

      for (let i = 0; i < this.estructura.domEls.length; i++) {
        const thisDomEl = this.estructura.domEls[i]
        if (thisDomEl instanceof Array && bjtFormKeeper[this.estructura.identificador][i] !== undefined && bjtFormKeeper[this.estructura.identificador][i] !== null) {
          for (let j = 0; j < thisDomEl.length; j++) {
            if (bjtFormKeeper[this.estructura.identificador][i][j] === true) {
              thisDomEl[j].checked = true
            }
          }
        } else if (thisDomEl.type === 'checkbox') {
          thisDomEl.checked = bjtFormKeeper[this.estructura.identificador][i] ? bjtFormKeeper[this.estructura.identificador][i] : false
        } else {
          thisDomEl.value = bjtFormKeeper[this.estructura.identificador][i] ? bjtFormKeeper[this.estructura.identificador][i] : ''
        }
      }
      resolve(this.estructura.restaurarCallback)
    })

    promesa.then((callback) => {
      if (cb !== undefined && this.isFunction(cb)) cb.call()
      if (cb === undefined) callback.call()
    }, (error) => {
      console.warn(error)
    })
  }
  static limpiar (cb, ask) {
    const cnfrm = typeof ask === 'string' ? window.confirm(ask) : ask === 'true' || ask !== undefined ? window.confirm('¿Desea eliminar toda la información guardada por FormKeeper?') : true

    const promesa = new Promise((resolve, reject) => {
      if (cnfrm) {
        window.localStorage.removeItem('FormKeeperLite')
        resolve(this.estructura.limpiarCallback)
      } else {
        reject('Los datos siguen a salvo.')
      }
    })

    promesa.then((callback) => {
      if (cb !== undefined && this.isFunction(cb)) cb.call()
      if (cb === undefined) callback.call()
    }, (cancelado) => {
      console.log(cancelado)
    })
  }
  // Encriptador adaptado de: http://hdeleon.net/codificar-y-decodificar-base64-en-javascript/ GRACIAS!!!
  _keyStr () {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }
  encode (e) {
    let t = ''
    let n, r, i, s, o, u, a
    let f = 0
    e = this.utf8Encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = (n & 3) << 4 | r >> 4
      u = (r & 15) << 2 | i >> 6
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr().charAt(s) + this._keyStr().charAt(o) + this._keyStr().charAt(u) + this._keyStr().charAt(a)
    }
    return t
  }
  decode (e) {
    let t = ''
    let n, r, i
    let s, o, u, a
    let f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr().indexOf(e.charAt(f++))
      o = this._keyStr().indexOf(e.charAt(f++))
      u = this._keyStr().indexOf(e.charAt(f++))
      a = this._keyStr().indexOf(e.charAt(f++))
      n = s << 2 | o >> 4
      r = (o & 15) << 4 | u >> 2
      i = (u & 3) << 6 | a
      t = t + String.fromCharCode(n)
      if (u !== 64) t = t + String.fromCharCode(r)
      if (a !== 64) t = t + String.fromCharCode(i)
    }
    t = this.utf8Decode(t)
    return t
  }
  utf8Encode (e) {
    e = e.replace(/rn/g, 'n')
    let t = ''
    for (let n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192)
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224)
        t += String.fromCharCode(r >> 6 & 63 | 128)
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  }
  utf8Decode (e) {
    let t = ''
    let n = 0
    let r = 0
    let c2 = 0
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode((r & 31) << 6 | c2 & 63)
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        let c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        n += 3
      }
    }
    return t
  }
  isFunction (functionToCheck) {
    const getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
  }
}

// Hacer un limpiador, un callback de ese limpiador y un limpiador automático

/*
 *
 * Lista de cambios (Changelog):
 *
 * - ¡NUEVO! Sitio Web Demostrativo
 *
 * - (DESARROLLO) Watch switcheable por parámetro con gulp
 *
 * - Algunos fallos arreglados
 *
 */

/*
 *
 * FormKeeper
 * Versión: 1.3.x
 * Repositorio: https://github.com/EdGraVill/FormKeeper
 * Licencia: General Public Licence 3.0
 * Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end.
 * 3 Versiones: Completa, Lite y Attributable.
 * Changelog al pie del código.
 *
 */

window.onload = () => {
  // Función para hacer splice de un array dentro de otro array. Adaptado de http://stackoverflow.com/a/28162065
  Array.prototype.spliceArray = function (index, n, array) {
    return Array.prototype.splice.apply(this, [index, n].concat(array))
  }

  function FormKeeperAttributable () {
  }

  FormKeeperAttributable._keyStr = function () {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }

  FormKeeperAttributable.saveValue = function (index, domElValue, identificador) {
    const bjtFormKeeper = window.localStorage.getItem('FormKeeperAttributable') !== null ? JSON.parse(this.decode(window.localStorage.getItem('FormKeeperAttributable'))) : {}

    bjtFormKeeper[identificador] = bjtFormKeeper[identificador] ? bjtFormKeeper[identificador] : []

    bjtFormKeeper[identificador][index] = domElValue

    const readyToSend = this.encode(JSON.stringify(bjtFormKeeper))

    window.localStorage.setItem('FormKeeperAttributable', readyToSend)
  }

  FormKeeperAttributable.saveRadio = function (index, domElValue, identificador, info) {
    const bjtFormKeeper = window.localStorage.getItem('FormKeeperAttributable') !== null ? JSON.parse(this.decode(window.localStorage.getItem('FormKeeperAttributable'))) : {}

    bjtFormKeeper[identificador] = bjtFormKeeper[identificador] ? bjtFormKeeper[identificador] : []

    bjtFormKeeper[identificador][index] = bjtFormKeeper[identificador][index] ? bjtFormKeeper[identificador][index] : []

    for (let i = 0; i < info[0]; i++) {
      bjtFormKeeper[identificador][index][i] = false
    }

    bjtFormKeeper[identificador][index][info[1]] = domElValue

    const readyToSend = this.encode(JSON.stringify(bjtFormKeeper))

    window.localStorage.setItem('FormKeeperAttributable', readyToSend)
  }

  FormKeeperAttributable.restaurar = function (cb) {
    const promesa = new Promise((resolve, reject) => {
      const bjtFormKeeper = window.localStorage.getItem('FormKeeperAttributable') !== null ? JSON.parse(this.decode(window.localStorage.getItem('FormKeeperAttributable'))) : null

      if (bjtFormKeeper === null) reject('No hay elementos que restaurar en este momento.')

      for (let i = 0; i < fk.domEls.length; i++) {
        const thisDomEl = fk.domEls[i]
        if (thisDomEl instanceof Array && bjtFormKeeper[fk.identificador][i] !== undefined && bjtFormKeeper[fk.identificador][i] !== null) {
          for (let j = 0; j < thisDomEl.length; j++) {
            if (bjtFormKeeper[fk.identificador][i][j] === true) {
              thisDomEl[j].checked = true
            }
          }
        } else if (thisDomEl.type === 'checkbox') {
          thisDomEl.checked = bjtFormKeeper[fk.identificador][i] ? bjtFormKeeper[fk.identificador][i] : false
        } else {
          thisDomEl.value = bjtFormKeeper[fk.identificador][i] ? bjtFormKeeper[fk.identificador][i] : ''
        }
      }
      resolve(fk.restaurarCallback)
    })

    promesa.then((callback) => {
      if (cb !== undefined && this.isFunction(cb)) cb.call()
      if (cb === undefined) callback.call()
    }, (error) => {
      console.warn(error)
    })
  }

  FormKeeperAttributable.limpiar = function (cb, ask) {
    const cnfrm = typeof ask === 'string' ? window.confirm(ask) : ask === 'true' || ask !== undefined ? window.confirm('¿Desea eliminar toda la información guardada por FormKeeper?') : true

    const promesa = new Promise((resolve, reject) => {
      if (cnfrm) {
        window.localStorage.removeItem('FormKeeperAttributable')
        resolve(fk.restaurarCallback)
      } else {
        reject('Los datos siguen a salvo.')
      }
    })

    promesa.then((callback) => {
      if (cb !== undefined && this.isFunction(cb)) cb.call()
      if (cb === undefined) callback.call()
    }, (cancelado) => {
      console.log(cancelado)
    })
  }

  FormKeeperAttributable.encode = function (e) {
    let t = ''
    let n, r, i, s, o, u, a
    let f = 0
    e = this.utf8Encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = (n & 3) << 4 | r >> 4
      u = (r & 15) << 2 | i >> 6
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr().charAt(s) + this._keyStr().charAt(o) + this._keyStr().charAt(u) + this._keyStr().charAt(a)
    }
    return t
  }

  FormKeeperAttributable.decode = function (e) {
    let t = ''
    let n, r, i
    let s, o, u, a
    let f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr().indexOf(e.charAt(f++))
      o = this._keyStr().indexOf(e.charAt(f++))
      u = this._keyStr().indexOf(e.charAt(f++))
      a = this._keyStr().indexOf(e.charAt(f++))
      n = s << 2 | o >> 4
      r = (o & 15) << 4 | u >> 2
      i = (u & 3) << 6 | a
      t = t + String.fromCharCode(n)
      if (u !== 64) t = t + String.fromCharCode(r)
      if (a !== 64) t = t + String.fromCharCode(i)
    }
    t = this.utf8Decode(t)
    return t
  }

  FormKeeperAttributable.utf8Encode = function (e) {
    e = e.replace(/rn/g, 'n')
    let t = ''
    for (let n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192)
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224)
        t += String.fromCharCode(r >> 6 & 63 | 128)
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  }

  FormKeeperAttributable.utf8Decode = function (e) {
    let t = ''
    let n = 0
    let r = 0
    let c2 = 0
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode((r & 31) << 6 | c2 & 63)
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        let c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        n += 3
      }
    }
    return t
  }

  FormKeeperAttributable.getPathTo = function (element) {
    if (element.id !== '') return `id("${element.id}")`
    if (element === document.body) return element.tagName

    let ix = 0
    let siblings = element.parentNode.childNodes
    for (let i = 0; i < siblings.length; i++) {
      var sibling = siblings[i]
      if (sibling === element) return `${this.getPathTo(element.parentNode)}/${element.tagName}[${ix + 1}]`
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
    }
  }

  FormKeeperAttributable.isFunction = function (functionToCheck) {
    const getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
  }

  const fk = {
    domEls: [],
    ignorarTipos: [
      'submit',
      'reset',
      'button',
      'file',
      'image'
    ],
    elementos: [
      'INPUT',
      'SELECT',
      'TEXTAREA',
      'DATALIST'
    ],
    restaurarCallback: () => {
      console.log('Elementos restaurados con éxito.')
    },
    limpiarCallback: () => {
      console.log('FormKeeper limpiado con éxito.')
    }
  }

  for (let i = 0; i < document.getElementsByTagName('*').length; i++) {
    if (document.getElementsByTagName('*')[i].getAttribute('FormKeeper') !== null) {
      fk.domEls.push(document.getElementsByTagName('*')[i])
    }
  }

  if (fk.domEls.length === 0) return console.warn('No hay ningún elemento con el atributo "FormKeeper", tan solo añada dicho atributo al elemento o elementos con los que desea trabajar. Ejemplo: <input id="miInput" name="miInput" FormKeeper>. O bien, puede leer la documentación en https://github.com/EdGraVill/FormKeeper/tree/master/Attributable')

  for (let i = 0; i < fk.domEls.length; i++) {
    if (fk.domEls[i].childNodes.length !== 0) {
      const hijos = fk.domEls[i].childNodes
      const procesados = []

      for (let i = 0; i < hijos.length; i++) {
        if (fk.elementos.indexOf(hijos[i].tagName) >= 0 && fk.ignorarTipos.indexOf(hijos[i].type) === -1) {
          procesados.push(hijos[i])
        }
      }

      fk.domEls.spliceArray(i, 1, procesados)
    }
  }

  // Agregar el identificador único con el que evitaremos repetir o ingresar datos en el lugar que no corresponden.
  fk.identificador = FormKeeperAttributable.encode(`${window.location.href} - ${FormKeeperAttributable.getPathTo(fk.domEls[0])}`)

  const objRds = {}
  for (let i = 0; i < fk.domEls.length; i++) {
    const thisDomEl = fk.domEls[i]
    if (thisDomEl.type === 'radio') {
      if (!objRds[thisDomEl.name]) objRds[thisDomEl.name] = []
      objRds[thisDomEl.name].push(thisDomEl)
    }
  }

  for (let i = 0; i < fk.domEls.length; i++) {
    const thisDomEl = fk.domEls[i]
    if (thisDomEl.type === 'radio') {
      const thsNm = thisDomEl.name
      fk.domEls[i] = objRds[thsNm]
      fk.domEls.splice(i + 1, objRds[thsNm].length - 1)
    }
  }

  for (let i = 0; i < fk.domEls.length; i++) {
    const thisDomEl = fk.domEls[i]
    if (thisDomEl.tagName === 'INPUT' || thisDomEl.tagName === 'TEXTAREA') {
      if (thisDomEl.type === 'checkbox') {
        thisDomEl.setAttribute('onchange', `FormKeeperAttributable.saveValue(${i}, this.checked, '${fk.identificador}', ${fk.encriptado})`)
      } else if (thisDomEl.type === 'range' || thisDomEl.type === 'color') {
        thisDomEl.setAttribute('onchange', `FormKeeperAttributable.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
      } else if (thisDomEl.type === 'text' || thisDomEl.type === 'password' || thisDomEl.type === 'email' || thisDomEl.type === 'search' || thisDomEl.type === 'url' || thisDomEl.tagName === 'TEXTAREA') {
        thisDomEl.setAttribute('onkeyup', `FormKeeperAttributable.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
      } else {
        thisDomEl.setAttribute('onkeyup', `FormKeeperAttributable.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
        thisDomEl.setAttribute('onchange', `FormKeeperAttributable.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
      }
    } else if (thisDomEl instanceof Array) {
      for (let j = 0; j < thisDomEl.length; j++) {
        thisDomEl[j].setAttribute('onchange', `FormKeeperAttributable.saveRadio(${i}, this.checked, '${fk.identificador}', ${fk.encriptado}, [${thisDomEl.length},${j}])`)
      }
    } else {
      thisDomEl.setAttribute('onchange', `FormKeeperAttributable.saveValue(${i}, this.value, '${fk.identificador}', ${fk.encriptado})`)
    }
  }
}

/*
 *
 * Lista de cambios (Changelog):
 *
 * - ¡NUEVO! Sitio Web Demostrativo
 *
 * - (DESARROLLO) Watch switcheable por parámetro con gulp
 *
 * - Algunos fallos arreglados
 *
 */
