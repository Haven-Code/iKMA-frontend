<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0">
			<v-flex fill-height>
				<v-sheet rounded="lg" class="mx-3 mt-2 px-5 py-4 pb-7 icsBox px-3">

					<div class="ppx-text-center ppx-mb-4">
						<v-avatar size="140" color="grey darken-1">
							<!-- <v-img
								src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Blue03&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
							></v-img> -->
							<v-img
								src="https://i.imgur.com/dn1R8ys.png"
							></v-img>
						</v-avatar>

						<p class="ppx-mt-3 ppx-text-3xl">{{ user.userInfo.displayName }}</p>
					</div>

					<v-data-table :headers="headers" hide-default-header hide-default-footer :items="items" class="elevation-0 text-center table ma-auto">
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
import { mapState } from 'vuex';
import Navbar from '@/components/Navbar';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default {
	name: 'Profile',
	components: {
		Navbar,
	},
	computed: {
		...mapState(['user']),
		items() {
			let data = [
				{
					name: 'Giới Tính:',
					value: this.user.userInfo.gender,
				},
				{
					name: 'Ngày Sinh:',
					value: this.user.userInfo.birthday,
				},
				{
					name: 'Ngành Học:',
					value: this.checkSubject,
				},
				{
					name: 'Khoá Học',
					value: this.checkStudyYear,
				},
				{
					name: 'Số Ca Đã Học / Tổng Số Ca (Trong kỳ hiện tại):',
					value: this.countStudied + ' / ' + this.user.userSchedule.length + ' ( Còn lại ' + (this.user.userSchedule.length - this.countStudied) + ' ca )',
				},
			];
			return data;
		},
		countStudied() {
			let count = 0;
			this.user.userSchedule.forEach((item) => {
				if (dayjs(item.day, 'DD/MM/YYYY').isBefore(dayjs())) {
					count++;
				}
			});
			return count;
		},
		checkSubject() {
			let code = this.user.userInfo.studentCode.substr(0, 2).toLowerCase();
			let subject = '';

			switch (code) {
				case 'at':
					subject = 'An Toàn Thông Tin';
					break;
				case 'ct':
					subject = 'Công Nghệ Thông Tin';
					break;
				case 'dt':
					subject = 'Điện Tử - Viễn Thông';
					break;
				default:
					subject = 'Không Rõ';
			}
			return subject;
		},
		checkStudyYear() {
			let course = this.user.userInfo.studentCode.substr(0, 4).toUpperCase();
			let courseNumber = this.user.userInfo.studentCode.substr(2, 2);
			// console.log(courseNumber);

			let code = this.user.userInfo.studentCode.substr(0, 2).toLowerCase();
			let yearNow = dayjs().format('YY');
			let year = '';

			switch (code) {
				case 'at':
					year = Number(yearNow) - Number(courseNumber) - 2;
					break;
				case 'ct':
					year = Number(yearNow) - Number(courseNumber) - 14;
					break;
				case 'dt':
					year = Number(yearNow) - Number(courseNumber) - 15;
					break;
				default:
					year = '';
			}
			return `${course} ( Năm thứ ${year} )`;
		},
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
	}),
};
</script>

<style></style>
