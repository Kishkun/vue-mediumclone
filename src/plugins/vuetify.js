import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {},
      dark: {}
    },
    breakpoint: {
      thresholds: {
        xs: 0,
        sp: 365,
        sm: 600,
        md: 1024,
        lg: 1280,
        xl: 1440
      }
    }
  }
})
