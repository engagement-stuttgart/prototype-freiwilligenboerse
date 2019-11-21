import Vue from 'vue'
import Buntpapier from 'buntpapier'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import api from 'lib/api'

import 'styles/global.styl'

Vue.config.productionTip = false

Vue.use(Buntpapier)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
