<!-- @format -->

<template>
	<v-main>
		<navbar></navbar>

		<v-container fill-height fluid class="pa-0 " :class="{ 'ppx-bg-gray-200': !this.$vuetify.theme.dark }">
			<v-flex fill-height>
				<v-sheet elevation="1" rounded="lg" class="mx-3 mt-2 px-5 py-4 pb-7 icsBox px-3">
					<p class="text-center ppx-text-2xl ppx-font-medium">Xuất File Icalendar (.ics)</p>

					<center>
						<v-btn large color="primary" class="mt-3" :loading="buttonExport.loading" @click.stop="createIcs()">
							<v-icon class="mr-3">mdi-file-export</v-icon>
							Xuất File
						</v-btn>

						<v-progress-linear v-model="processBar.loadingPercent" class="mt-5 md:ppx-w-1/3 ppx-w-full" stream buffer-value="100" rounded color="light-green darken-3" height="23" striped>
							<template v-slot:default="{ value }">
								<strong>{{ Math.ceil(value) }}%</strong>
							</template>
						</v-progress-linear>

						<v-btn large class="mt-5" color="success" v-if="!buttonDownload.hide" :loading="buttonDownload.loading" @click.stop="downloadFile()">
							<v-icon class="mr-3">mdi-file-download</v-icon>
							Tải Xuống
						</v-btn>
					</center>
				</v-sheet>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import { createEvents } from 'ics';

export default {
	components: { Navbar },
	name: 'Ics',
	metaInfo: {
		title: 'Xuất File ICalendar',
		titleTemplate: ' %s | KMA Schedule',
	},
	data: () => ({
		buttonExport: {
			loading: false,
		},
		buttonDownload: {
			hide: true,
			loading: false,
		},
		processBar: {
			loadingPercent: 0,
		},
		schedule: {
			count: 0,
			index: 0,
			events: [],
		},
		fileValue: '',
	}),
	computed: {
		...mapState(['user']),
	},
	methods: {
		convertLessonsToTime(lessons) {
			let time = {
				start: '',
				end: '',
			};
			switch (lessons) {
				case '1,2,3':
					time = {
						start: '7:00',
						end: '9:25',
					};
					break;
				case '4,5,6':
					time = {
						start: '9:35',
						end: '12:00',
					};
					break;
				case '7,8,9':
					time = {
						start: '12:30',
						end: '14:55',
					};
					break;
				case '10,11,12':
					time = {
						start: '15:05',
						end: '17:30',
					};
					break;
				case '13,14,15,16':
					time = {
						start: '18:00',
						end: '21:15',
					};
					break;
				case '7,8,9,10':
					time = {
						start: '12:30',
						end: '15:50',
					};
					break;
			}
			return time;
		},
		convertDayTime(day, lesson) {
			let lessonTime = this.convertLessonsToTime(lesson);
			let time = {
				start: '',
				end: '',
			};
			if (lessonTime.start == '' || lessonTime.end == '') {
				time = {
					start: dayjs(day, 'DD/MM/YYYY').format('YYYY-M-D'),
					end: dayjs(day, 'DD/MM/YYYY').format('YYYY-M-D'),
				};
			} else {
				time = {
					start: dayjs((day + ' ' + lessonTime.start).trim(), 'DD/MM/YYYY H:mm').format('YYYY-M-D-H-m'),
					end: dayjs((day + ' ' + lessonTime.end).trim(), 'DD/MM/YYYY H:mm').format('YYYY-M-D-H-m'),
				};
			}
			return time;
		},
		createIcs() {
			this.buttonExport.loading = true;
			this.schedule.count = this.user.userSchedule.length;

			this.schedule.events = this.user.userSchedule.map((event, index) => {
				const time = this.convertDayTime(event.day, event.lesson);

				this.schedule.index = index + 1;
				this.processBar.loadingPercent = Math.ceil((index / this.schedule.count) * 100);

				return {
					title: event.subjectName,
					description: `Tiết ${event.lesson} \n Lớp: ${event.className} \n Giáo Viên: ${event.teacher}`,
					productId: 'KMASchedulePoweredByDHP',
					uid: index + 1 + '@kma.dhpgo.com',
					location: event.room,
					geo: {
						lat: 20.9808114,
						lon: 105.7962285,
					},
					start: time.start.split('-'),
					end: time.end.split('-'),
				};
			});

			const { error, value } = createEvents(this.schedule.events);

			if (error) {
				console.log('ERROR: ', error);
			} else {
				this.fileValue = value;
			}

			this.processBar.loadingPercent = 100;

			this.buttonDownload.hide = false;

			this.buttonExport.loading = false;
		},
		downloadFile() {
			// console.log(this.$ics.calendar())
			this.buttonDownload.loading = true;

			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(this.fileValue));
			element.setAttribute('download', this.user.userInfo.displayName + '-' + this.user.userInfo.studentCode);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);

			this.buttonDownload.loading = false;
		},
	},
};
</script>

<style></style>
