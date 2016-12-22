<h1 align="center">FormKeeper</h1>

<p align="center"><img src="https://github.com/EdGraVill/formKeeper/raw/master/logo-small.png" alt="FormKeeper Logo"></p>

<p align="center">Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end.</p>

<h2 align="center">Preámbulo</h2>

### ¿Para qué sirve?

FormKeeper almacena de forma automática la información ingresada en uno o una serie de inputs específicados previamente, con la posibilidad de restaurar los valores cuantas veces sea.

No importa si la pestaña se recarga o se cierra, el navegador se reinicia o se cierra completamente; incluso, no importa si la computadora se apaga o se reinicia, la información estará disponible, gracias a las bondades de localStorage.

### ¿De dónde surgió la idea?

La idea original de una librería surgió a raíz de un [comentario](https://www.facebook.com/groups/872874032743480/permalink/1358045230893022/) dentro del grupo de facebook de Comunidad PLatzi. [Mauricio Vallejo](https://www.facebook.com/mauricio.vallejo.90?fref=nf) se queda con el crédito de la inspiración para esta librería.

### Restricciones

Esta librería, está escrita bajo el estandar ES6 o ES2015, con lo cual, su uso se sujeta a la compatibilidad que sólo ofrecen los navegadores más recientes.

Para más información:
(Links de [caniuse.com](http://caniuse.com/))
* [Compatibilidad ES6](http://caniuse.com/#search=ES6)
* [Compatibilidad localStorage](http://caniuse.com/#search=localStorage)
* [Compatibilidad de Promesas](http://caniuse.com/#search=Promises)

<h2 align="center">Implementación</h2>

### Instalación

Como cualquier otra librería, su implementación se basa en su invocación dentro del documento HTML. Pero esta vez, la librería, al tratarse de un Objeto, no depende de la carga del documento completo para funcionar; por lo que se puede incluir desde el `<head>`.

###### Ejemplo:
````HTML
<!DOCTYPE html>
<html>
  <head>
    [...]
    <title>...</title>
    <script src="./ruta/a/FormKeeper.js" charset="utf-8"></script>
  </head>
  <body>
    [...]
  </body>
</html>
````

### Uso

#### Crear una nueva instancia
Para que funcione correctamente, hay que crear una nueva instancia del objeto FormKeeper y almacenarla en una constante

###### Ejemplo:
````HTML
<html>
  [...]
  <body>
    <form id="ejemplo">
      <input type="text" name="nombres">
      <input type="text" name="apellidos">
    </form>

    <script type="text/javascript">
      const salvarForm = new FormKeeper( domEl [, encriptacion] )
    </script>
  </body>
</html>
````

#### Guardado de los Datos
Los datos se guardan automáticamente al detectar que ha cambiado el input, ya sea después de agregarle un nuevo caracter a los que son de entrada de texto, o al cambio para los que son de interacción.

#### Restauración de los Datos
El método para restaurar los valores almacenados en memoria es `FormKeeper.prototype.restaurar( callback )`.

###### Ejemplo:
````JS
const salvarForm = new FormKeeper('ejemplo')

salvarForm.restaurar()
````

##### Callback
Además, el método admite por parámetro un callback que se ejecuta una vez los datos se hayan restaurado.

###### Ejemplo:
````JS
const salvarForm = new FormKeeper('ejemplo')

salvarForm.restaurar(() => {
  alert('¡Sus datos regresaron a como los dejó! :)')
})
````

##### Autorestauración
También, los Datos pueden ser restaurados de forma automática al cargar la página. Para conseguirlo, es necesario ingresar por primer parámetro un objeto con las opciones deseadas
###### Ejemplo:
````JS
const opcionesFK = {
  domEl: 'ejemplo',
  restaurarDefault: true // <-- Por defecto su valores es 'false'
}

const salvarForm = new FormKeeper(opcionesFK)
````

### FormKeeper( domEl/Lista/Opciones [, encriptacion] )

El objeto FormKeeper acepta por parámetro dos valores. el primero es obligatorio, y puede ser:

* Un DOM Element que contenga múltiples inputs y sus variantes.
* Un DOM Element que sea un simple `<input>`, `<select>`, `<textarea>`, etc. Esto en caso de sólo querer mantener seguro un solo DOM Element
* Un Array como lista de múltiples y específicos DOM Elements. ([Ver cómo 'Ignorar domEls']()).
* Un objeto con Opciones Avanzadas

El segundo parámetro es opcional, y recibe como valor un `Boolean`, que por defecto se encuentra como `true`. Esto para indicar si la información antes de almacenarse se encriptará.

#### domEl
La forma más básica de inicializar FormKeeper es simplemente indicándole por parámetro el `id` u objeto almacenado de:

* `<form>`, `<div>`, etc; contenedor de inputs y sus variantes.
* DOM Element simple (Que sea un input o sus variantes).

##### Nuestro HTML:
###### Ejemplo:
````HTML
<html>
  [...]
  <body>
    <form id="ejemplo">
      <input id="nombres" type="text" name="nombres">
      <input id="apellidos" type="text" name="apellidos">
    </form>
  </body>
</html>
````
##### Nuestro JS:
En caso de querer mantener a salvo todo el form.
###### Ejemplo:
````JS
// Indicando un objeto almacenado:
const miForm = document.getElementById('ejemplo')

const salvarForm = new FormKeeper(miForm)

// Indicando el id de nuestro form:
const salvarForm = new FormKeeper('ejemplo') // <- Yo certifico este método 👌👍
````
En caso de sólo mantener a salvo un DOM Element específico.
###### Ejemplo:
````JS
// Indicando un objeto almacenado:
const miNombres = document.getElementById('nombres')

const salvarForm = new FormKeeper(miNombres)

// Indicando el id de nuestro elemento específico:
const salvarForm = new FormKeeper('apellidos') // <- Yo certifico este método 👌👍
````

#### Lista (Array)
Otra forma "básica" de inicializar FormKeeper es indicarle por parámetro un `Array` con los `id` u objetos almacenados de los DOM Elements específicos
> Si uno de los elementos de la lista es un contenedor, puede haber consecuencias catastróficas. Para esos caso, recomiendo ampliamente usar el objeto de Opciones Avanzadas e indicar el DOM Elements simples a [ignorar]()

##### Nuestro HTML:
###### Ejemplo:
````HTML
<html>
  [...]
  <body>
    <form id="ejemplo">
      <input id="nombres" type="text" name="nombres">
      <input id="apellidos" type="text" name="apellidos">
      <input type="text" name="noLoQuiero">
    </form>
  </body>
</html>
````
##### Nuestro JS:
###### Ejemplo:
````JS
// Indicando con objetos almacenados:
const miNombres = document.getElementById('nombres')
const miApellidos = document.getElementById('apellidos')

const salvarForm = new FormKeeper([miNombres, miApellidos])

// Indicando los id de nuestros form:
const salvarForm = new FormKeeper(['nombres', 'apellidos']) // <- Yo certifico este método 👌👍
````

#### Objeto de Opciones Avanzadas
El guardar y restaurar datos guardados puede ser tan complejo como el desarrollador quiera, por lo cual una característica experimental es la personalización de los eventos con un objeto. Para más información, ve la sección dedicada de [Opciones Avanzadas]()
##### Nuestro HTML:
###### Ejemplo:
````HTML
<html>
  [...]
  <body>
    <form id="ejemplo">
      <input id="nombres" type="text" name="nombres">
      <input id="apellidos" type="text" name="apellidos">
    </form>
  </body>
</html>
````
##### Nuestro JS:
###### Ejemplo:
````JS
// Indicando un objeto almacenado:
const miForm = document.getElementById('ejemplo')

const opcionesFK = { domEl: miForm }

const salvarForm = new FormKeeper(opcionesFK)

// Indicando el id de nuestro form:
const opcionesFK = { domEl: 'ejemplo' } // <- Yo certifico este método 👌👍

const salvarForm = new FormKeeper(opcionesFK) // <- Y con todo y esto 👌👍
````
`.domEl` Admite al igual que como es indicado por parámetro, un contenedor un elemento específico o una lista de elementos específicos.

<h2 align="center">Opciones Avanzadas</h2>

Opción | Valores Aceptados | Valor por Defecto | Explicación
------ | ----------------- | ----------------- | -----------
`.domEl` | `String` / `Array` / `Object` / `Variable` | `null` | Puede ser el DOM Element contenedor, el DOM Element específico, o una lista de los DOM Elements específicos.
`.domEls` | `Array` | `[]` | PELIGROSO: Es el lugar donde se almacenan los DOM Elements con los que se va a trabajar. Para indicar una lista, fijar un Array en `.domEl`.
`.ignorarDomEls` | `Array` | `[]` | Lista de DOM Elements que serán ignorados durante el proceso de guardado y de restauración. Esto claro, en caso que `.domEl` fuera un contenedor.
`.ignorarTipos` | `Array` | `['submit', 'reset', 'button', 'file', 'image']` | PELIGROSO: Es la lista donde se almacenan los tipos de input que no es posible entenderse hasta el momento, por favor, a menos que sepa lo que hace, no lo cambie.
`.elementos` | `Array` | `['INPUT', 'SELECT', 'TEXTAREA', 'DATALIST']` | PELIGROSO: Es la lista de tagNames que FormKeeper entiende y puede procesar a la perfección. Por favor, a menos que sepa lo que hace, no lo cambie.
`.ignorarElementos` | `Array` | `[]` | Lista de los tagNames que se van a ignorar durante el proceso de ejecución.
`.encriptado` | `Boolean` | `true` | Opción que define si el guardado y la restauración de datos se hace de forma encriptada. El valor de este método tiene prioridad por sobre el valor en el segundo parámetro de `FormKeeper()`
`.restaurarDefault` | `Boolean` | `false` | Opción que define si al cargar la librería los elementos se restauran automáticamente.
`.restaurarCallback` | `Function` | `() => { console.log('Elementos restaurados con éxito.') }` | Es la función callback por defecto que se ejecuta después de restaurar los elementos.

###### Ejemplo:
````JS
const opcionesFK = {
  domEl: 'ejemplo',
  ignorarDomEls: ['nombres'],
  encriptado: true,
  restaurarDefault: true,
  restaurarCallback: () => {
    alert('Sus datos están a salvo gracias a FormKeeper')
  }
}

const salvarForm = new FormKeeper(opcionesFK)
````

<h2 align="center">API</h2>

### FormKeeper.prototype.restaurar( [callback] )
Método para restaurar los elementos en un momento determinado.

OPCIONAL: Por parámetro se le puede asignar un callback personalizado.

### FormKeeper.saveValue(index, domElValue, identificador, encriptado)
Método estático usado para salvar los datos que nos son inputs de tipo radio

### FormKeeper.saveRadio(index, domElValue, identificador, encriptado, info)
Método estático usado para salvar los datos que son inputs de tipo radio

<h2 align="center">Compatibilidad</h2>

Actualmente, FormKeeper puede entender, salvar y restaurar los siguientes DOM Elements:

* `<datalist>`
* `<input type="checkbox">`
* `<input type="color">`
* `<input type="date">`
* `<input type="datetime-local">`
* `<input type="email">`
* `<input type="hidden">`
* `<input type="month">`
* `<input type="number">`
* `<input type="password">`
* `<input type="radio">`
* `<input type="range">`
* `<input type="search">`
* `<input type="tel">`
* `<input type="text">`
* `<input type="time">`
* `<input type="url">`
* `<input type="week">`
* `<select>`
* `<textarea>`

<h2 align="center">Para futuras versiones</h2>

Es diciembre del 2016. Los propósitos para el siguiente año, por lo menos, son los siguientes:

- [ ] Método para limpiar el localStorage de una instancia específica.
- [ ] Método para limpiar el localStorage de una lista de instancias específicas.
- [ ] Método estático para limpiar el localStorage de cualquier información generada por FormKeeper.
- [ ] Callback después de ejecutar algún método de limpieza
- [ ] Ejemplo más bonito (hahaha) e interactivo.
- [ ] Capacidad de desactivar y activar autoguardado de Datos.
- [ ] Método para guardar Datos de forma manual.
- [ ] Callback después de ejecutar algún método de guardado de datos.
- [ ] Soporte para entender, salvar y restaurar `contenteditable Attribute`.
- [ ] Agregar soporte para ignorar por selectores.
- [ ] Agregar los recursos usados en el README.
- [ ] Tener traducciones para distintos idiomas de la documentación.
- [ ] Invitar a mucha gente para contribuir y también para que lo apliquen a su proyecto.
- [ ] Listar los sitios que usan FormKeeper en el README.
- [ ] Inspirar a más programadores a seguir mejorando internet.

Gracias.
