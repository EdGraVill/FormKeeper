const gulp = require('gulp-param')(require('gulp'), process.argv)
const watch = require('gulp-watch')
const rename = require('gulp-rename')
const minify = require('gulp-prettydiff')
const header = require('gulp-header')
const footer = require('gulp-footer')
const concat = require('gulp-concat')
const cache = require('gulp-cached')
const remember = require('gulp-remember')

const v = '1.3.x'

const headerT = `/*\n *\n * FormKeeper\n * Versión: ${v}\n * Repositorio: https://github.com/EdGraVill/FormKeeper\n * Licencia: General Public Licence 3.0\n * Mantén la información de tus "form" sin guardar a salvo de cualquier imprevisto. JavaScript puro y sin necesidad de back-end.\n * 3 Versiones: Completa, Lite y Attributable.\n * Changelog al pie del código.\n *\n */\n\n`
const footerT = '\n/*\n *\n * Lista de cambios (Changelog):\n *\n * - ¡NUEVO! Sitio Web Demostrativo.\n *\n * - ¡Nueva! Página en facebook.\n *\n * - ¡Nuevo! Métodos estáticos y heredados para limpiar la memoria.\n *\n * - ¡Nuevo! Método para conocer la cantidad de información guardada.\n *\n * - READMEs con más ejemplos.\n *\n * - (DESARROLLO) Watch switcheable por parámetro con gulp.\n *\n * - ¡Nuevo! CDN con jsDelivr.\n *\n * - Algunos fallos arreglados.\n *\n */\n'

gulp.task('default', function (w) {
  if (w) {
    console.log('...and now my watch begins.')
    return watch(['./src/main.js', './src/metodos/*.js'], function () {
      gulp.src(['./src/main.js', './src/metodos/*.js'])
        .pipe(cache('default'))
        .pipe(header(headerT))
        .pipe(footer(footerT))
        .pipe(remember('default'))
        .pipe(concat('FormKeeper.js'))
        .pipe(gulp.dest('./'))
        .pipe(minify({
          lang: 'js',
          mode: 'minify'
        }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./'))
    })
  } else {
    return gulp.src(['./src/main.js', './src/metodos/*.js'])
    .pipe(cache('default'))
    .pipe(header(headerT))
    .pipe(footer(footerT))
    .pipe(remember('default'))
    .pipe(concat('FormKeeper.js'))
    .pipe(gulp.dest('./'))
    .pipe(minify({
      lang: 'js',
      mode: 'minify'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'))
  }
})

gulp.task('lite', function (w) {
  if (w) {
    console.log('...and now my watch begins.')
    return watch('./src/lite.js', function () {
      return gulp.src('./src/lite.js')
        .pipe(cache('default'))
        .pipe(header(headerT))
        .pipe(footer(footerT))
        .pipe(remember('default'))
        .pipe(concat('FormKeeperLite.js'))
        .pipe(gulp.dest('./Lite'))
        .pipe(minify({
          lang: 'js',
          mode: 'minify'
        }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./Lite'))
    })
  } else {
    return gulp.src('./src/lite.js')
      .pipe(cache('default'))
      .pipe(header(headerT))
      .pipe(footer(footerT))
      .pipe(remember('default'))
      .pipe(concat('FormKeeperLite.js'))
      .pipe(gulp.dest('./Lite'))
      .pipe(minify({
        lang: 'js',
        mode: 'minify'
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./Lite'))
  }
})

gulp.task('attributable', function (w) {
  if (w) {
    console.log('...and now my watch begins.')
    return watch('./src/attributable.js', function () {
      gulp.src('./src/attributable.js')
        .pipe(cache('default'))
        .pipe(header(headerT))
        .pipe(footer(footerT))
        .pipe(remember('default'))
        .pipe(concat('FormKeeperAttributable.js'))
        .pipe(gulp.dest('./Attributable'))
        .pipe(minify({
          lang: 'js',
          mode: 'minify'
        }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('./Attributable'))
    })
  } else {
    return gulp.src('./src/attributable.js')
      .pipe(cache('default'))
      .pipe(header(headerT))
      .pipe(footer(footerT))
      .pipe(remember('default'))
      .pipe(concat('FormKeeperAttributable.js'))
      .pipe(gulp.dest('./Attributable'))
      .pipe(minify({
        lang: 'js',
        mode: 'minify'
      }))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./Attributable'))
  }
})
