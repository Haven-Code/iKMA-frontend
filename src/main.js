/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'

Vue.config.productionTip = false

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast, {
	position: 'top-right',
})

import Meta from 'vue-meta'
Vue.use(Meta)

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app')
