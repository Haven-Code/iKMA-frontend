/** @format */

module.exports = {
	transpileDependencies: ['vuetify'],

	publicPath: "/",

	pluginOptions: {
		i18n: {
			locale: 'vi',
			fallbackLocale: 'vi',
			localeDir: 'lang',
			enableInSFC: true,
		},
	},

	pwa: {
		name: 'iKMA',
		themeColor: '#90CAF9',
		msTileColor: '#90CAF9',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'default',
		manifestOptions: {
			icons: [
				{
					src: './assets/icons/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: './assets/icons/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: './assets/icons/android-chrome-maskable-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: './assets/icons/android-chrome-maskable-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: './assets/icons/apple-touch-icon-60x60.png',
					sizes: '60x60',
					type: 'image/png',
				},
				{
					src: './assets/icons/apple-touch-icon-76x76.png',
					sizes: '76x76',
					type: 'image/png',
				},
				{
					src: './assets/icons/apple-touch-icon-120x120.png',
					sizes: '120x120',
					type: 'image/png',
				},
				{
					src: './assets/icons/apple-touch-icon-152x152.png',
					sizes: '152x152',
					type: 'image/png',
				},
				{
					src: './assets/icons/apple-touch-icon-180x180.png',
					sizes: '180x180',
					type: 'image/png',
				},
				{
					src: './assets/icons/apple-touch-icon.png',
					sizes: '180x180',
					type: 'image/png',
				},
				{
					src: './assets/icons/favicon-16x16.png',
					sizes: '16x16',
					type: 'image/png',
				},
				{
					src: './assets/icons/favicon-32x32.png',
					sizes: '32x32',
					type: 'image/png',
				},
				{
					src: './assets/icons/msapplication-icon-144x144.png',
					sizes: '144x144',
					type: 'image/png',
				},
				{
					src: './assets/icons/mstile-150x150.png',
					sizes: '150x150',
					type: 'image/png',
				},
			],
			scope: '/',
			start_url: '/',
			background_color: '#ffffff',
			shortcuts: [
				{
					name: 'Mở Thời Khoá Biểu',
					short_name: 'Thời Khoá Biểu',
					url: '/',
					icons: [{ src: '/assets/icons/calendar-alt-solid.png', sizes: '192x192' }],
				},
				{
					name: 'Tool Chuyển Sang Icalendar',
					short_name: 'Chuyển Sang Icalendar',
					url: '/ics',
					icons: [{ src: '/assets/icons/tools-solid.png', sizes: '192x192' }],
				},
				{
					name: 'Đồng Bộ Google/Microsoft',
					short_name: 'Đồng Bộ Hoá',
					url: '/sync',
					icons: [{ src: '/assets/icons/sync-solid.png', sizes: '192x192' }],
				},
				{
					name: 'Ủng Hộ Tác Giả',
					short_name: 'Ủng Hộ',
					url: '/donate',
					icons: [{ src: '/assets/icons/sync-solid.png', sizes: '192x192' }],
				},
			],
			related_applications: [
				{
					platform: 'webapp',
					url: 'https://kma.dhpgo.com/manifest.json',
				},
			],
		},
		workboxPluginMode: 'GenerateSW',
		workboxOptions: {
			exclude: [/\.map$/, /_redirects/, /netlify.toml/],
			skipWaiting: true,
			navigateFallback: '/',
		},
	},
};
