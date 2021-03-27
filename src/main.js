/** @format */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './assets/tailwind.css';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;

import wb from './registerServiceWorker';
Vue.prototype.$workbox = wb;
// import './registerServiceWorker'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {
	position: 'top-right',
});

import Meta from 'vue-meta';

Vue.use(Meta);

// const firebaseConfig = {
// 	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
// 	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.VUE_APP_FIREBASE_APP_ID,
// 	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
// };

// import firebase from 'firebase';
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

new Vue({
	router,
	store,
	vuetify,
	i18n,
	render: (h) => h(App),
}).$mount('#app');
