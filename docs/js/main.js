// Remplazos extraídos y adaptados de: https://gist.github.com/mateuspadua/c0d8cb2e299deed57aa8eee38f530ef6

function extend (a, b) {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key]
    }
  }
  return a
}

// keep default js alert to use in specific cases
window.legacyAlert = window.alert

// keep default js confirm to use in specific cases
window.legacyConfirm = window.confirm

window.alert = (m, params) => {
  swal(extend({
    text: m
  }, params || {}))
}

window.confirm = (m, params) => {
  swal(extend({
    text: m,
    type: 'question',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar',
    allowEscapeKey: false,
    allowOutsideClick: false
  }, params || {})).then((isConfirm) => {
    x = true
  }, (dismiss) => {
  // dismiss can be 'cancel', 'overlay', 'close', 'timer'
    return false
  })
}
