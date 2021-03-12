/** @format */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

import user from './user';

// const ls = new SecureLS({
// 	isCompression: true,
// 	encodingType: 'aes',
// 	encryptionSecret: process.env.VUE_APP_STORAGE_KEY,
// });

const ls = new SecureLS({
	isCompression: false,
	// encodingType: 'aes',
	// encryptionSecret: process.env.VUE_APP_STORAGE_KEY,
});

Vue.use(Vuex);

const pluginState = createPersistedState({
	storage: {
		getItem: (key) => ls.get(key),
		setItem: (key, value) => ls.set(key, value),
		removeItem: (key) => ls.remove(key),
	},
	paths: ['user', 'config.theme'],
});

export default new Vuex.Store({
	state: {
		config: {
			drawer: null,
			darkMode: null,
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
	},
	modules: {
		user: user,
	},
	plugins: [pluginState],
});
