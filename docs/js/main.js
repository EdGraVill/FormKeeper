window.legacyAlert = window.alert

window.alert = (m, params) => {
  swal($.extend({
    text: m
  }, params || {}))
}

$(document).ready(function () {
  $('#fullpage').fullpage({
    // Navegación
    anchors: ['intro', 'fkCompleto', 'fkLite', 'fkAttributable'],
    menu: '#fkMenu',
    slidesNavigation: false,
    navigation: false,
    navigationTooltips: ['Intro', 'FormKeeper Completo', 'FormKeeper Lite', 'FormKeeper Attributable'],
    slidesNavPosition: 'bottom',

    // Desplazamiento
    css3: true,
    scrollingSpeed: 400,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    scrollOverflow: true,
    scrollOverflowReset: false,
    scrollOverflowOptions: null,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,
    bigSectionsDestination: null,

    // Accesibilidad
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    // Diseno
    controlArrows: false,
    verticalCentered: true,
    sectionsColor: ['#ecf0f1', '#fff', '#fff', '#fff']
  })
})

// Ejemplo 1

$('menu').click(function () {
  $.fn.fullpage.moveTo($(this).parent('nav').parent('section').attr('data-anchor'), $(this).attr('to'))
})

const ejemplo1 = new FormKeeper({
  domEl: 'ejemplo1',
  ignorarDomEls: ['ej1password', 'ej1passwordR']
})

$('#ej1restaurar').click(function () {
  ejemplo1.restaurar(() => {
    alert(`${ejemplo1.guardados()} valores Restaurados con FormKeeper`)
  })
})

$('#ej1limpiar').click(function () {
  ejemplo1.limpiar(() => {
    alert(`${ejemplo1.guardados()} valores Limpiados con FormKeeper`)
    $('#ej1restaurar').fadeOut('400')
    $('#ej1limpiar').fadeOut('400')
  })
})

if (ejemplo1.guardados() > 0) {
  $('#ej1restaurar').fadeIn('400')
  $('#ej1limpiar').fadeIn('400')
}

// Ejemplo 2
