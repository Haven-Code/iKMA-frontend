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
				{{ ($refs.calendar.title) }}
			</template>
		</navbar>

		<v-container fill-height fluid class="pa-0">
			<v-flex fill-height>
				<v-calendar ref="calendar" v-model="focus" color="primary" class="ppx-border-0"></v-calendar>
				<!-- <v-menu v-model="selectedOpen" :close-on-content-click="false" offset-x>
				<v-card color="grey lighten-4" min-width="350px" flat>
					<v-toolbar :color="selectedEvent.color" dark>
						<v-btn icon>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>mdi-heart</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</v-toolbar>
					<v-card-text>
						<span v-html="selectedEvent.details"></span>
					</v-card-text>
					<v-card-actions>
						<v-btn text color="secondary" @click="selectedOpen = false">
							Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-menu> -->
			</v-flex>
		</v-container>
	</v-main>
</template>

<script>
import Navbar from '../../components/Navbar.vue';

export default {
	name: 'Calendar',
	components: {
		Navbar,
	},
	data: () => ({
		focus: '',
	}),
	methods: {
		setToday() {
			this.focus = '';
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
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
	},
	mounted(){
		this.setToday()
	}
};
</script>

<style></style>
