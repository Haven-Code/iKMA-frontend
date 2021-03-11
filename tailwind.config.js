/** @format */

module.exports = {
	prefix: 'ppx-',
	important: true,
	purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			color: {
				'custom-dark-bg': '#272727'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
