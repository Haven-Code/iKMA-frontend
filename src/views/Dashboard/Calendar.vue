<!-- @format -->

<template>
	<v-main>
		<navbar>
			<template v-slot:left>
				<div class="calendarControl ppx-flex">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined class="mr-4" @click="setToday" v-bind="attrs" v-on="on">
								{{ $t('calendar.today') }}
							</v-btn>
						</template>
						<span>Về hôm nay</span>
					</v-tooltip>

					<!-- <v-select class="mr-4" v-model="webViewCalendar.type" :items="webViewCalendar.types" dense outlined hide-details label="Kiểu Lịch"></v-select> -->

					<v-menu bottom right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined v-bind="attrs" v-on="on">
								<span>{{ webViewCalendar.typeToLabel[webViewCalendar.type] }}</span>

								<v-icon right>
									mdi-menu-down
								</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item @click="webViewCalendar.type = 'day'">
								<v-list-item-title>{{ $t('calendar.day') }}</v-list-item-title>
							</v-list-item>
							<v-list-item @click="webViewCalendar.type = 'week'">
								<v-list-item-title>{{ $t('calendar.week') }}</v-list-item-title>
							</v-list-item>
							<v-list-item @click="webViewCalendar.type = 'month'">
								<v-list-item-title>{{ $t('calendar.month') }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>

					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn fab icon small @click="prev" class="ml-4" v-bind="attrs" v-on="on">
								<v-icon small>
									mdi-chevron-left
								</v-icon>
							</v-btn>
						</template>
						<span>Tháng trước</span>
					</v-tooltip>

					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn fab icon small @click="next" class="ml-2" v-bind="attrs" v-on="on">
								<v-icon small>
									mdi-chevron-right
								</v-icon>
							</v-btn>
						</template>
						<span>Tháng sau</span>
					</v-tooltip>
				</div>
			</template>

			<template v-slot:title v-if="$refs.calendar">
				<span class="hidden-sm-and-down ml-2">{{ translateMonth($refs.calendar.title) }}</span>
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
					:type="webViewCalendar.type"
					:weekdays="[1, 2, 3, 4, 5, 6, 0]"
				></v-calendar>

				<v-menu v-if="webViewCalendar.selectedOpen" v-model="webViewCalendar.selectedOpen" :activator="webViewCalendar.selectedElement" :close-on-content-click="false" offset-x>
					<v-card color="grey darken-2" style="opacity: 0.95" min-width="400px" flat>
						<v-toolbar dark color="primary">
							<v-toolbar-title v-html="webViewCalendar.selectedEvent.name"></v-toolbar-title>
							<v-spacer></v-spacer>
						</v-toolbar>

						<v-card-text class="pb-0 ppx-text-white">
							<p class="pa-0 ma-0 mb-1">
								{{ $t('calendar.schedule.subject') }}:
								<strong>{{ webViewCalendar.selectedEvent.eventData.subjectName }} ({{ webViewCalendar.selectedEvent.eventData.subjectCode }})</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								{{ $t('calendar.schedule.class') }}:
								<strong>{{ webViewCalendar.selectedEvent.eventData.className }}</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								{{ $t('calendar.schedule.lesson') }}:
								<strong>{{ webViewCalendar.selectedEvent.eventData.lesson }}</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								{{ $t('calendar.schedule.room') }}:
								<strong>{{ webViewCalendar.selectedEvent.eventData.room }}</strong>
							</p>

							<p class="pa-0 ma-0 mb-1">
								{{ $t('calendar.schedule.teacher') }}:
								<strong>{{ webViewCalendar.selectedEvent.eventData.teacher }}</strong>
							</p>
						</v-card-text>

						<v-card-actions class="pb-2 pr-2">
							<v-spacer></v-spacer>
							<v-btn large text @click="webViewCalendar.selectedOpen = false" class="ppx-text-white">
								{{ $t('close') }}
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
					:locale="config.lang"
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
											{{ $t('calendar.schedule.lesson') }}:
											<strong>{{ event.lesson }}</strong>
											|
											<strong> {{ convertLessonsToTime(event.lesson).start }} -> {{ convertLessonsToTime(event.lesson).end }} </strong>
										</v-list-item-subtitle>

										<v-list-item-subtitle class="text-subtitle-1">
											{{ $t('calendar.schedule.room') }}:
											<strong>{{ event.room }}</strong>
										</v-list-item-subtitle>

										<v-list-item-subtitle class="text-subtitle-1">
											{{ $t('calendar.schedule.teacher') }}:
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
import {convertLessonsToTime} from "../../utils";
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
			type: 'month',
			typeToLabel: {
				month: 'Tháng',
				week: 'Tuần',
				day: 'Ngày',
			},
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
	metaInfo() {
		return {
			title: this.$i18n.t('title.schedule'),
			titleTemplate: ' %s | iKMA',
		};
	},
	computed: {
		...mapState(['user', 'config']),
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
			if (!str) return str;

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
		convertDayTime(day, lesson) {
			let lessonTime = convertLessonsToTime(lesson);
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
