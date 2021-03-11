/** @format */

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import vi from '@/lang/vuetify/vi';

Vue.use(Vuetify);

export default new Vuetify({
	lang: {
		locales: { vi },
		current: 'vi',
	},
});
