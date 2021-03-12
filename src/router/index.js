/** @format */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				name: 'Home',
				path: '',
				component: () => import(/* webpackChunkName: "schedule" */ '../views/Dashboard/Calendar.vue'),
			},
			{
				name: 'Sync',
				path: '/sync',
				component: () => import(/* webpackChunkName: "sync" */ '../views/Dashboard/Sync.vue'),
			},
			{
				name: 'Ics',
				path: '/ics',
				component: () => import(/* webpackChunkName: "ics" */ '../views/Dashboard/Ics.vue'),
			},
			{
				name: 'Scores',
				path: '/scores',
				component: () => import(/* webpackChunkName: "scores" */ '../views/Dashboard/Scores.vue'),
			},
			{
				name: 'PWA',
				path: '/pwa',
				component: () => import(/* webpackChunkName: "pwa" */ '../views/Dashboard/PWA.vue'),
			},
			// {
			// 	name: 'Profile',
			// 	path: '/profile',
			// 	component: () => import(/* webpackChunkName: "sync" */ '../views/Dashboard/Sync.vue'),
			// },
			{
				name: 'Donate',
				path: '/donate',
				component: () => import(/* webpackChunkName: "donate" */ '../views/Dashboard/Donate.vue'),
			},
		],
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const user = store.state.user.isLogined;

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!user) {
			next({ name: 'Auth' });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
