/** @format */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import i18n, { selectedLocale } from '@/plugins/i18n';

import user from './user';

const ls = new SecureLS({
	isCompression: true,
	encodingType: 'aes',
	encryptionSecret: process.env.VUE_APP_STORAGE_KEY,
});

// const ls = new SecureLS({
// 	isCompression: false,
// });

Vue.use(Vuex);

const getItemFromKey = (key) => {
	try {
		let a = ls.get(key);
		return a;
	} catch (e) {
		//console.log(e);
		console.error("WRONG KEY ! REDIRECT TO AUTH #PPX")
		ls.removeAll();
	}
};

const pluginState = createPersistedState({
	storage: {
		getItem: (key) => getItemFromKey(key),
		setItem: (key, value) => ls.set(key, value),
		removeItem: (key) => ls.remove(key),
	},
	paths: ['user', 'config'],
});

export default new Vuex.Store({
	state: {
		config: {
			drawer: null,
			darkMode: null,
			lang: selectedLocale,
		},
	},
	mutations: {
		SET_CONFIG: (state, payload) => {
			state.config = payload;
		},
		DRAWER: (state) => {
			let drawer = state.config.drawer;
			state.config.drawer = !drawer;
		},
		SET_THEME: (state, payload) => {
			state.config.darkMode = payload;
		},
		SET_LANG: (state, payload) => {
			state.config.lang = payload;
		},
	},
	actions: {
		setConfig: ({ commit }, payload) => {
			commit('SET_CONFIG', payload);
		},
		toggleDrawer: ({ commit }) => {
			commit('DRAWER');
		},
		toggleDarkMode: ({ commit }, payload) => {
			commit('SET_THEME', payload);
		},
		changeLanguage: ({ commit }, payload) => {
			i18n.locale = payload;
			commit('SET_LANG', payload);
		},
	},
	modules: {
		user: user,
	},
	plugins: [pluginState],
});
