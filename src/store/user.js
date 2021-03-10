/** @format */

export default {
	namespace: true,
	state: {
		isLogined: false,
		userInfo: {},
		userSchedule: {},
	},
	mutations: {
		SET_USER: (state, payload) => {
			state.userData = payload.studentInfo;
			state.userSchedule = payload.schedule;
			state.isLogined = true;
		},
		SET_LOGOUT: (state) => {
			console.log('LOGOUT');
			state.userData = null;
			state.userSchedule = null;
			state.isLogined = false;
		},
	},
	actions: {
		login: ({ commit }, payload) => {
			commit('SET_USER', payload);
		},
		logout: ({ commit }) => {
			commit('SET_LOGOUT');
		},
	},
};
