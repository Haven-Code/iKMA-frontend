<!-- @format -->

<template>
	<v-main>
		<navbar>
			<template v-slot:left>
				<div class="calendarControl">
					<v-btn outlined class="mr-4" @click="setToday">
						Hôm Nay
					</v-btn>

					<v-btn fab icon small @click="prev">
						<v-icon small>
							mdi-chevron-left
						</v-icon>
					</v-btn>

					<v-btn fab icon small @click="next">
						<v-icon small>
							mdi-chevron-right
						</v-icon>
					</v-btn>
				</div>
			</template>

			<template v-slot:title v-if="$refs.calendar">
				<span class="hidden-sm-and-down">{{ translateMonth($refs.calendar.title) }}</span>
			</template>
		</navbar>

		<v-container fill-height fluid class="pa-0 ppx-overflow-hidden hidden-sm-and-down">
			<v-flex fill-height class="webView ">
				<v-calendar
					ref="calendar"
					v-model="webViewCalendar.focus"
					@click:event="showEvent"
					@click:more="viewDay"
					:events="webViewCalendar.events"
					color="primary"
					class="ppx-border-0"
				></v-calendar>

				<v-menu v-if="webViewCalendar.selectedOpen" v-model="webViewCalendar.selectedOpen" :activator="webViewCalendar.selectedElement" :close-on-content-click="false" offset-x>
					<v-card color="grey darken-2" style="opacity: 0.95" min-width="400px" flat>
						<v-toolbar dark color="primary">
							<v-toolbar-title v-html="webViewCalendar.selectedEvent.name"></v-toolbar-title>
							<v-spacer></v-spacer>
						</v-toolbar>

						<v-card-text class="pb-0 ppx-text-white">
							<p class="pa-0 ma-0 mb-1">
								Môn:
								<strong>{{ webViewCalendar.selectedEvent.eventData.subjectName }} ({{ webViewCalendar.selectedEvent.eventData.subjectCode }})</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								Lớp:
								<strong>{{ webViewCalendar.selectedEvent.eventData.className }}</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								Tiết:
								<strong>{{ webViewCalendar.selectedEvent.eventData.lesson }}</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								Phòng Học:
								<strong>{{ webViewCalendar.selectedEvent.eventData.room }}</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								Giáo Viên:
								<strong>{{ webViewCalendar.selectedEvent.eventData.teacher }}</strong>
							</p>
						</v-card-text>

						<v-card-actions class="pb-2 pr-2">
							<v-spacer></v-spacer>
							<v-btn large text @click="webViewCalendar.selectedOpen = false" class="ppx-text-white">
								Đóng
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-menu>
			</v-flex>
		</v-container>

		<v-container class="mobileView hidden-md-and-up ppx-p-2">
			<v-flex class="ppx-mt-1">
				<vc-calendar
					is-expanded
					locale="vi"
					@dayclick="showEventMobile"
					:is-dark="$vuetify.theme.dark"
					:attributes="mobileViewCalendar.attrs"
					show-weeknumbers
					:first-day-of-week="2"
					color="blue"
					transition="slide-h"
				/>

				<v-card elevation="1" rounded="lg" class="scheduleList mt-2 ppx-h-80">
					<p v-if="!mobileViewCalendar.events" class="text-center mt-5">Bạn không có môn học vào hôm này !</p>

					<v-card-text v-else class="pa-0">
						<v-list class="mb-3" nav disabled inactive subheader>
							<v-list-item-group>
								<v-list-item three-line v-for="(event, index) in mobileViewCalendar.events" :key="index">
									<v-list-item-content>
										<v-list-item-title class="text-h6">{{ event.subjectName }}</v-list-item-title>

										<v-list-item-subtitle class="text-subtitle-1">
											Tiết:
											<strong>{{ event.lesson }}</strong>
											|
											<strong> {{ convertLessonsToTime(event.lesson).start }} -> {{ convertLessonsToTime(event.lesson).end }} </strong>
										</v-list-item-subtitle>

										<v-list-item-subtitle class="text-subtitle-1">
											Phòng:
											<strong>{{ event.room }}</strong>
										</v-list-item-subtitle>

										<v-list-item-subtitle class="text-subtitle-1">
											Giáo Viên:
											<strong>{{ event.teacher }}</strong>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd';
import Navbar from '../../components/Navbar.vue';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import 'dayjs/locale/vi';
dayjs.locale('vi');

export default {
	name: 'Calendar',
	components: {
		Navbar,
		'vc-calendar': Calendar,
	},
	data: () => ({
		webViewCalendar: {
			events: [],
			focus: '',
			selectedEvent: {},
			selectedElement: null,
			selectedOpen: false,
			type: '',
		},
		mobileViewCalendar: {
			events: [],
			attrs: [
				{
					key: 'today',
					highlight: 'blue',
					dates: dayjs().toDate(),
				},
			],
		},
	}),
	metaInfo: {
		title: 'Thời Khoá Biểu',
		titleTemplate: ' %s | KMA Schedule',
	},
	computed: {
		...mapState(['user']),
	},
	methods: {
		setToday() {
			this.webViewCalendar.focus = '';
		},
		viewDay() {
			this.webViewCalendar.type = 'day';
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.webViewCalendar.selectedEvent = event;
				this.webViewCalendar.selectedElement = nativeEvent.target;
				setTimeout(() => {
					this.webViewCalendar.selectedOpen = true;
				}, 10);
			};
			if (this.webViewCalendar.selectedOpen) {
				this.webViewCalendar.selectedOpen = false;
				setTimeout(open, 10);
			} else {
				open();
			}
			nativeEvent.stopPropagation();
		},
		translateMonth(str) {
			let a = str.split(' ');
			const dic = {
				January: 'Tháng Một',
				February: 'Tháng Hai',
				March: 'Tháng Ba',
				April: 'Thánng Bốn',
				May: 'Tháng Năm',
				June: 'Tháng Sáu',
				July: 'Tháng Bảy',
				August: 'Tháng Tám',
				September: 'Tháng Chín',
				October: 'Tháng Mười',
				November: 'Tháng Mười Một',
				December: 'Tháng Mười Hai',
			};
			let text = dic[a[0]] + ' ' + a[1];
			return text;
		},
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
					start: dayjs(day, 'DD/MM/YYYY').format('YYYY-MM-DD'),
					end: dayjs(day, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				};
			} else {
				time = {
					start: dayjs((day + ' ' + lessonTime.start).trim(), 'DD/MM/YYYY H:mm').format('YYYY-MM-DD HH:mm'),
					end: dayjs((day + ' ' + lessonTime.end).trim(), 'DD/MM/YYYY H:mm').format('YYYY-MM-DD HH:mm'),
				};
			}
			return time;
		},
		addEvent() {
			const { userSchedule } = this.user;
			this.webViewCalendar.events = userSchedule.map((x) => {
				const { start, end } = this.convertDayTime(x.day, x.lesson);
				return {
					name: x.subjectName,
					eventData: x,
					start: start,
					end: end,
					color: 'blue lighten-1',
				};
			});

			const mobileDots = userSchedule.map((x, index) => {
				return {
					key: index + 1,
					dot: {
						color: 'blue',
					},
					dates: dayjs(x.day, 'DD/MM/YYYY').toDate(),
				};
			});

			this.mobileViewCalendar.attrs = [...this.mobileViewCalendar.attrs, ...mobileDots];
		},
		showEventMobile(e) {
			let day = dayjs(e.date).format('DD/MM/YYYY');
			const { userSchedule } = this.user;

			this.mobileViewCalendar.events = userSchedule.filter((event) => {
				return event.day === day;
			});
		},
	},
	beforeMount() {
		this.addEvent();
	},
};
</script>
