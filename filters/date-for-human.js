import Vue from 'vue'
import parseISO from 'date-fns/fp/parseISO'
import formatWithOptions from 'date-fns/fp/formatWithOptions'
import { fr } from 'date-fns/locale'

Vue.filter('dateForHuman', function(value, format = 'PP') {
  if (value) {
    value = value.toString()
    return formatWithOptions({ locale: fr }, format)(parseISO(value))
  }
})
