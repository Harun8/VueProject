import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Import Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'  // Import global Vuetify styles
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import Material Design Icons (optional)
// import '@mdi/font/css/materialdesignicons.css'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// Register Vuetify and mount the app
createApp(App).use(vuetify).mount('#app')
