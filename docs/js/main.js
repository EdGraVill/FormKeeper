function extend (a, b) {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key]
    }
  }
  return a
}

window.legacyAlert = window.alert

window.alert = (m, params) => {
  swal(extend({
    text: m
  }, params || {}))
}

// Scroll
const cordenadas = []

const getCordenadas = () => {
  cordenadas.length = 0
  for (let i = 0; i < (document.body.children.length - document.getElementsByTagName('script').length); i++) {
    cordenadas.push($(document.body.children[i]).position().top)
  }
  console.log(cordenadas)
}
getCordenadas()

$(window).resize(function() {
  getCordenadas()
})

const moveUp = (c) => {
  if (!$('body').is(':animated')) {
    $('body').animate({scrollTop: cordenadas[c]}, 400)
  }
}

const moveDown = (c) => {
  if (!$('body').is(':animated')) {
    $('body').animate({scrollTop: cordenadas[c]}, 400)
  }
}

let posicion = $(window).scrollTop()
let current = () => {
  for (let i = 0; i < cordenadas.length; i++) {
    if (posicion < cordenadas[i]) return i - 1
  }
}
$(window).scroll(function(e) {
  const scroll = $(window).scrollTop()
  if (scroll > posicion) {
    console.log('scrollDown')
    moveDown(current())
  } else {
    console.log('scrollUp')
    moveUp(current())
  }
  posicion = scroll
})
