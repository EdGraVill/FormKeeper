# FormKeeper

![FormKeeper Logo](https://github.com/EdGraVill/formKeeper/raw/master/logo-small.png)

FormKeeper te ayuda no importa qué caso fortuito te toque.

## Preámbulo

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

## Implementación

### Instalación

Como cualquier otra librería, su implementación se basa en su invocación dentro del documento HTML. Pero esta vez, la librería, al tratarse de un Objeto, no depende de la carga del documento completo para funcionar; por lo que se puede incluir desde el `<head>`.

#### Ejemplo
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

##### Ejemplo
````HTML
<html>
  [...]
  <body>
    <form id="ejemplo">
      <input type="text" name="nombres">
      <input type="text" name="apellidos">
    </form>

    <script type="text/javascript">
      const saveForm = new FormKeeper( domEl [, encriptacion] )
    </script>
  </body>
</html>
````

#### Guardado de los Datos
Los datos se guardan automáticamente al detectar que ha cambiado el input, ya sea después de agregarle un nuevo caracter a los que son de entrada de texto, o al cambio para los que son de interacción.

#### Restauración de los Datos
El método para restaurar los valores almacenados en memoria es `FormKeeper.prototype.restaurar( callback )`.

##### Ejemplo:
````JS
const saveForm = new FormKeeper('ejemplo')

saveForm.restaurar()
````
Además, el método admite por parámetro un callback que se ejecuta una vez los datos se hayan restaurado.
##### Ejemplo:
````JS
const saveForm = new FormKeeper('ejemplo')

saveForm.restaurar(() => {
  alert('¡Sus datos regresaron a como los dejó! :)')
})
````

### FormKeeper( domEl [, encriptacion] )
