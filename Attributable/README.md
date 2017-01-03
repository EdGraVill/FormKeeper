<h1 align="center">FormKeeper Attributable</h1>

<p align="center"><img src="https://github.com/EdGraVill/formKeeper/raw/master/Attributable/logo-small.png" alt="Attributable Logo"></p>

<p align="center">Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end. ¡AHORA FÁCIL Y RÁPIDO!... ¡Y SIN CASI CÓDIGO!</p>

<h2 align="center">Índice</h2>

##### 1. [Ediciones](#ediciones)
&nbsp;&nbsp;1.1 [FormKeeper](#-formkeeper)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1.1 [Documentación](https://github.com/EdGraVill/FormKeeper#formkeeper)  
&nbsp;&nbsp;1.2 [FormKeeper Lite](#-formkeeper-lite)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2.1 [Documentación](https://github.com/EdGraVill/FormKeeper/tree/master/Lite#formkeeper-lite)  
&nbsp;&nbsp;1.3 [FormKeeper Attributable](#-formkeeper-attributable)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.3.1 [Documentación](https://github.com/EdGraVill/FormKeeper/tree/master/Attributable#formkeeper-attributable)  

##### 2. [Preámbulo](#preámbulo)
&nbsp;&nbsp;2.1 [¿Para qué sirve?](#para-qué-sirve)  
&nbsp;&nbsp;2.2 [¿De dónde surgió la idea?](#de-dónde-surgió-la-idea)  
&nbsp;&nbsp;2.3 [Restricciones](#restricciones)  
&nbsp;&nbsp;2.4 [Explicación de la Edición](#explicación-de-la-edición)

##### 3. [Implementación](#implementación)
&nbsp;&nbsp;3.1 [Instalación](#instalación)  
&nbsp;&nbsp;3.2 [Uso](#uso)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.1 [Asignar el atributo FormKeeper a nuestros elementos](#asignar-el-atributo-formkeeper-a-nuestros-elementos)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.2 [Guardado de los Datos](#guardado-de-los-datos)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.3 [Restauración de los Datos](#restauración-de-los-datos)   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.3.1 [Callback](#callback)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.4 [Limpieza de los Datos](#limpieza-de-los-datos)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.4.1 [Callback](#callback-1)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2.4.2 [Confirmación](#confirmación)   

##### 4. [Compatibilidad](#compatibilidad)

##### 5. [Para futuras versiones](#para-futuras-versiones)

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

Al igual que la Edición [Lite](https://github.com/EdGraVill/formKeeper/raw/master/Lite), esta edición pretende simplificar con creces la implementación de la librería. Sólo que en esta ocación, está orientada a personas con conocimientos muy básicos o nulos en JavaScript. Ya que la integración sucede directamente con el HTML.

<h2 align="center">Implementación</h2>

### Instalación

Como cualquier otra librería, su implementación se basa en su invocación dentro del documento HTML. La librería, al no tratarse de un Objeto como las otras ediciones, <strong>SI</strong> depende de la carga del documento completo para funcionar, pero está optimizado para esperar a la finalización de la carga del mismo; por lo que se puede incluir desde el `<head>`.

###### Ejemplo:
````HTML
<!DOCTYPE html>
<html>
  <head>
    [...]
    <title>...</title>
    <script src="./ruta/a/FormKeeperAttributable.js" charset="utf-8"></script>
  </head>
  <body>
    [...]
  </body>
</html>
````

¡NUEVO! Ahora, también se puede llamar desde un CDN gracias a [jsDelivr](http://www.jsdelivr.com/)

* http://cdn.jsdelivr.net/formkeeper/1/FormKeeperAttributable.js
* http://cdn.jsdelivr.net/formkeeper/1/FormKeeperAttributable.min.js

###### Ejemplo:
````HTML
<!DOCTYPE html>
<html>
  <head>
    [...]
    <title>...</title>
    <script src="http://cdn.jsdelivr.net/formkeeper/1/FormKeeperAttributable.min.js" charset="utf-8"></script>
  </head>
  <body>
    [...]
  </body>
</html>
````

### Uso

#### Asignar el atributo FormKeeper a nuestros elementos
Para que funcione correctamente, hay que asignar en el HTML el atributo `FormKeeper` a los elementos del DOM con los que queremos trabajar.

Se puede agregar el atributo a un elemento contenedor de diversos inputs.
###### Ejemplo:
````HTML
<!DOCTYPE html>
<html>
  [...]
  <body>
    <form FormKeeper> <!-- Al asignarlo al contenedor, funciona con todos los elementos dentro -->
      <input type="text" name="nombres">
      <input type="text" name="apellidos">
    </form>
  </body>
</html>
````

O bien, se puede agregar el atributo a elementos específicos del DOM por separado
###### Ejemplo:
````HTML
<!DOCTYPE html>
<html>
  [...]
  <body>
    <form>
      <input type="text" name="nombres" FormKeeper> <!-- Funciona aquí -->
      <input type="text" name="apellidos"> <!-- Aquí no -->
      <input type="email" name="email" FormKeeper> <!-- Funciona aquí -->
    </form>
  </body>
</html>
````

También se puede combinar y seleccionar elementos específicos y contenedores simultaneamente.

#### Guardado de los Datos
Los datos se guardan automáticamente al detectar que ha cambiado el input, ya sea después de agregarle un nuevo caracter a los que son de entrada de texto, o al cambio para los que son de interacción.

#### Restauración de los Datos
El método para restaurar los valores almacenados en memoria es `FormKeeper.prototype.restaurar( callback )`.

###### Ejemplo:
````JS
FormKeeperAttributable.restaurar()
````

##### Callback
Además, el método admite por parámetro un callback que se ejecuta una vez los datos se hayan restaurado.

###### Ejemplo:
````JS
FormKeeperAttributable.restaurar(() => {
  alert('¡Sus datos regresaron a como los dejó! :)')
})
````

#### Limpieza de los Datos
El método para restaurar los valores almacenados en memoria es `FormKeeperAttributable.limpiar( [callback, confirmación] )`.

###### Ejemplo:
````JS
// En caso de usar jQuery para escuchar eventos y borrar la información del form en cuestión
$('#ejemplo').submit(function() {
  [...]

  FormKeeperAttributable.limpiar()
})
````

##### Callback
Además, el método admite por parámetro un callback que se ejecuta una vez los datos se hayan limpiado.

###### Ejemplo:
````JS
// En caso de usar jQuery para escuchar eventos y borrar la información del form en cuestión
$('#ejemplo').submit(function() {
  [...]

  FormKeeperAttributable.limpiar(() => {
    console.log('FormKeeperAttributable limpiado.')
  })
})
````

##### Confirmación
También se puede elegir, por segundo parámetro y mediante un Boleano si mostrar o no un mensaje de confirmación antes de limpiar la información; además se puede personalizar el mensaje de confirmación mediante un String.

###### Ejemplo:
````JS
// En caso de usar jQuery para escuchar eventos y borrar la información del form en cuestión
$('#ejemplo').submit(function() {
  [...]

  FormKeeperAttributable.limpiar(() => {
    console.log('FormKeeperAttributable limpiado.')
  }, '¿Listo para borrar la información?')
})
````

<h2 align="center">Compatibilidad</h2>

Actualmente, FormKeeperAttributable puede entender, salvar y restaurar los siguientes DOM Elements:

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

Es enero del 2017. Los propósitos para este año, por lo menos, siguen siendo:

- [x] Método estático para limpiar el localStorage de cualquier información generada por FormKeeperAttributable.
- [x] Callback después de ejecutar algún método de limpieza
- [x] Ejemplo más bonito (hahaha) e interactivo.
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
- [ ] Restauración independiente de datos.

Gracias.
