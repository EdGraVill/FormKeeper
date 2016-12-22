<h1 align="center">FormKeeper Lite</h1>

<p align="center"><img src="https://github.com/EdGraVill/formKeeper/raw/master/Lite/logo-small.png" alt="FormKeeperLite Logo"></p>

<p align="center">Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end. ¡AHORA FÁCIL Y RÁPIDO!</p>

<h2 align="center">Ediciones</h2>

### ![FormKeeper](https://github.com/EdGraVill/formKeeper/raw/master/logo-icon.png) FormKeeper
Edición completa de FormKeeper con soporte para opciones avanzadas, además de personalización más clara y compleja

###### [Documentación](https://github.com/EdGraVill/FormKeeper#formkeeper)

### ![FormKeeperLite](https://github.com/EdGraVill/formKeeper/raw/master/Lite/logo-icon.png) FormKeeper Lite
Edición sin opciones avanzadas, planeada para la implementación y uso rápido, sencillo y sin exceso de código. No contiene funciones, por lo cual, el guardado y restablecimiento de datos es automático.

##### [Documentación](https://github.com/EdGraVill/FormKeeper/tree/master/Lite#formkeeper-lite)

### ![FormKeeperAttributable](https://github.com/EdGraVill/formKeeper/raw/master/Attributable/logo-icon.png) FormKeeper Attributable
Edición que se implementa sin utilizar ninguna linea de código, salvo para la restauración de los datos; sólo agregando el attributo `FormKeeper` al o los Elementos del DOM con los que se desea trabajar.

##### [Documentación](https://github.com/EdGraVill/FormKeeper/tree/master/Attributable#formkeeper-attributable)

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

### Explicación de la Edición

Esta edición pretende simplificar en la mayor medida posible su implementación, pues muchos desarrolladores buscan librerías con el afán de ahorrarse tiempo, por lo cual, lo más lógico es ofrecer una librería con una curvatura de aprendizaje mínima y que realice lo que tiene que realizar. Al evitar opciones avanzadas, todos los procesos son automáticos una vez indicados los elementos con los cuales trabajar.

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
    <script src="./ruta/a/FormKeeperLite.js" charset="utf-8"></script>
  </head>
  <body>
    [...]
  </body>
</html>
````

### Uso

#### Crear una nueva instancia
Para que funcione correctamente, hay que crear una nueva instancia del objeto FormKeeperLite y almacenarla en una constante

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
      const salvarForm = new FormKeeperLite( domEl/Lista/Opciones )
    </script>
  </body>
</html>
````

#### Guardado de los Datos
Los datos se guardan automáticamente al detectar que ha cambiado el input, ya sea después de agregarle un nuevo caracter a los que son de entrada de texto, o al cambio para los que son de interacción.

#### Restauración de los Datos
Los datos se restauran automáticamente al detectar que existe información para realizar dicha tarea.
> Esta opción no se puede cambiar o desabilitar, y el callback por defecto, es un `console.log('Elementos restaurados con éxito.')`

Tampoco se pueden ignorar elementos para guardar o restaurar en caso de tratarse de un elemento contenedor de inputs.

### FormKeeperLite( domEl/Lista )

El objeto FormKeeperLite acepta por parámetro un solo valor, y puede ser:

* Un DOM Element que contenga múltiples inputs y sus variantes.
* Un DOM Element que sea un simple `<input>`, `<select>`, `<textarea>`, etc. Esto en caso de sólo querer mantener seguro un solo DOM Element
* Un Array como lista de múltiples y específicos DOM Elements. ([Ver cómo 'Ignorar domEls']()).

El segundo parámetro es opcional, y recibe como valor un `Boolean`, que por defecto se encuentra como `true`. Esto para indicar si la información antes de almacenarse se encriptará.

#### domEl
La forma más básica de inicializar FormKeeperLite es simplemente indicándole por parámetro el `id` u objeto almacenado de:

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

const salvarForm = new FormKeeperLite(miForm)

// Indicando el id de nuestro form:
const salvarForm = new FormKeeperLite('ejemplo') // <- Yo certifico este método 👌👍
````
En caso de sólo mantener a salvo un DOM Element específico.
###### Ejemplo:
````JS
// Indicando un objeto almacenado:
const miNombres = document.getElementById('nombres')

const salvarForm = new FormKeeperLite(miNombres)

// Indicando el id de nuestro elemento específico:
const salvarForm = new FormKeeperLite('apellidos') // <- Yo certifico este método 👌👍
````

#### Lista (Array)
Otra forma "básica" de inicializar FormKeeperLite es indicarle por parámetro un `Array` con los `id` u objetos almacenados de los DOM Elements específicos
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

const salvarForm = new FormKeeperLite([miNombres, miApellidos])

// Indicando los id de nuestros form:
const salvarForm = new FormKeeperLite(['nombres', 'apellidos']) // <- Yo certifico este método 👌👍
````

<h2 align="center">Compatibilidad</h2>

Actualmente, FormKeeperLite puede entender, salvar y restaurar los siguientes DOM Elements:

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
