import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'


createApp(App).use(router).mount('#app')
// App.use(BootstrapIconsPlugin);
