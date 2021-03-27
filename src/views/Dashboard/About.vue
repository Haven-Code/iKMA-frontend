<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0">
			<v-flex fill-height>
				<v-sheet rounded="lg" class="mx-3 mt-2 px-5 py-4 pb-7 icsBox px-3">
					<v-data-table :headers="headers" :items="items" item-key="name" class="elevation-0 ma-auto text-center" hide-default-header hide-default-footer>
						<template v-slot:[`item.value`]="{ item }">
							<span v-html="item.value"></span>
						</template>
					</v-data-table>
				</v-sheet>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';

export default {
	name: 'About',
	components: { Navbar },
	metaInfo: {
		title: 'Thông Tin Ứng Dụng',
		titleTemplate: ' %s | iKMA',
	},
	data: () => ({
		headers: [
			{
				value: 'name',
			},
			{
				value: 'value',
			},
		],
		items: [
			{
				name: 'Tên Ứng Dụng',
				value: 'iKMA - KMA Schedule',
			},
			{
				name: 'Phiên Bản',
				value: process.env.VUE_APP_VERSION,
			},
			{
				name: 'Viết Bởi',
				value: '<a href="https://danghoangphuc.com" target="_blank">Đặng Hoàng Phúc (AT16)</a> [<a href="https://havencode.net" target="_blank">Haven Code</a>]',
			},
			{
				name: 'Năm Phát Hành',
				value: '2021',
			},
			{
				name: 'Framework / Library',
				value: 'Vue.js 2 - VueX - Vue Router - Vuetify - Tailwind CSS',
			},
			{
				name: 'Source Code',
				value: '<a href="https://github.com/Haven-Code/iKMA-frontend" target="_blank">Github</a>',
			},
			{
				name: 'Server',
				value: 'Netlify - Firebase - Azure Cloud Functions',
			},
			{
				name: 'Tương Thích',
				value: '<strong>Bất kỳ HĐH sử dụng Chrome 80 trở lên. Riêng IOS chạy tốt nhất từ IOS 11.3 trở lên !</strong>',
			},
			{
				name: 'Điều Khoản Sử Dụng',
				value: `<a href="/termofservice" target="_blank">Term Of Services</a>`,
			},
			{
				name: 'Chính Sách Quyền Riêng Tư',
				value: '<a href="/privacypolicy" target="_blank">Privacy Policy</a>',
			},
		],
	}),
};
</script>

<style></style>
