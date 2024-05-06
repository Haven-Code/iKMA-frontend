<!-- @format -->

<template>
    <v-main>
        <navbar></navbar>

        <v-container fill-height fluid class="pa-0" :class="{ 'ppx-bg-gray-200': !this.$vuetify.theme.dark }">
            <v-flex fill-height>
                <v-sheet rounded="lg" elevation="1" class="mx-3 mt-3 px-10 py-4 syncBox px-3">
                    <p class="text-center ppx-text-2xl ppx-font-medium">Nhập TKB vào Lịch Google / Microsoft</p>

                    <v-row class="mt-6">
                        <v-col cols="12" md="6">
                            <center>
                                <v-btn
                                    v-if="!google.authorized"
                                    @click.stop="handleGoogleSignInClick()"
                                    class="ppx-bg-red-600 ppx-rounded-lg hover:ppx-bg-red-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in"
                                    large
                                    dark
                                >
                                    <v-icon class="mr-3">mdi-google</v-icon>
                                    Đăng Nhập Với Google
                                </v-btn>

                                <v-btn
                                    v-else
                                    @click.stop="handleGoogleSignoutClick()"
                                    class="ppx-bg-red-600 ppx-rounded-lg hover:ppx-bg-red-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in"
                                    large
                                    dark
                                >
                                    <v-icon class="mr-3">mdi-close</v-icon>
                                    Ngắt Kết Nối Với Google
                                </v-btn>

                                <br />

                                <v-btn
                                    v-if="google.authorized"
                                    :loading="google.loadingBtn"
                                    @click.stop="importGoogleCalendar()"
                                    class="mt-3 ppx-bg-purple-600 ppx-rounded-lg hover:ppx-bg-purple-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in "
                                    large
                                    dark
                                >
                                    <v-icon class="mr-3">mdi-cloud-upload</v-icon>
                                    Nhập Vào Lịch Google
                                </v-btn>
                            </center>
                        </v-col>

                        <v-col cols="12" md="6">
                            <center>
                                <v-btn
                                    @click.stop="handleMicrosoftSignIn()"
                                    v-if="!microsoft.authorized"
                                    class="ppx-bg-blue-600 ppx-rounded-lg hover:ppx-bg-blue-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in"
                                    large
                                    dark
                                >
                                    <v-icon class="mr-3">mdi-microsoft</v-icon>
                                    Đăng Nhập Với Microsoft
                                </v-btn>

                                <v-btn
                                    @click.stop="handleMicrosoftSignOut()"
                                    v-else
                                    class="ppx-bg-blue-600 ppx-rounded-lg hover:ppx-bg-blue-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in"
                                    large
                                    dark
                                >
                                    <v-icon class="mr-3">mdi-close</v-icon>
                                    Ngắt Kết Nối Với Microsoft
                                </v-btn>

                                <br />

                                <v-btn
                                    v-if="microsoft.authorized"
                                    @click.stop="ImportMicrosoftCalendar()"
                                    :loading="microsoft.loadingBtn"
                                    class="mt-3 ppx-bg-purple-600 ppx-rounded-lg hover:ppx-bg-purple-700 ppx-shadow-3xl ppx-transform ppx-duration-200 ppx-ease-in "
                                    large
                                    dark
                                >
                                    <v-icon class="mr-3">mdi-cloud-upload</v-icon>
                                    Nhập Vào Lịch Microsoft
                                </v-btn>
                            </center>
                        </v-col>
                    </v-row>

                    <v-divider class="mt-5 mb-3"></v-divider>

                    <div
                        v-html="console"
                        :class="{ 'ppx-bg-gray-400': !this.$vuetify.theme.dark, 'ppx-bg-gray-800': this.$vuetify.theme.dark }"
                        class="console  mt-5 ppx-h-96 ppx-overflow-y-auto ppx-text-gray-100 px-4 py-3 ppx-rounded-lg ppx-shadow-sm mb-2"
                    ></div>
                </v-sheet>
            </v-flex>
        </v-container>
    </v-main>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import { mapState } from "vuex";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { convertLessonsToTime } from "../../utils";

dayjs.extend(customParseFormat);

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events";

export default {
    components: { Navbar },
    name: "Sync",
    metaInfo: {
        title: "Đồng Bộ Hoá",
        titleTemplate: " %s | iKMA",
    },
    data: () => ({
        google: {
            authorized: false,
            api: null,
            loadingBtn: false,
        },
        microsoft: {
            authorized: false,
            api: null,
            loadingBtn: false,
            account: null,
        },
        console: "<p>Chào bạn ! <br>Vui lòng liên kết với Google hoặc Microsoft để sử dụng tính năng này !</p>",
    }),
    computed: {
        ...mapState(["user"]),
    },
    created() {
        //Loading Google Client
        this.google.api = gapi; //eslint-disable-line
        this.google.api.load("client:auth2", this.initClient);

        //Loading Microsoft Library
        const msalConfig = {
            auth: {
                clientId: process.env.VUE_APP_MS_CLIENT_ID,
                redirectUri: process.env.VUE_APP_MS_REDIRECT_URL,
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: false,
                forceRefresh: false,
            },
        };

        const msalClient = new Msal.UserAgentApplication(msalConfig); //eslint-disable-line

        this.microsoft.api = msalClient;

        if (msalClient.getAccount() && !msalClient.isCallback(window.location.hash)) {
            this.microsoft.account = msalClient.getAccount();
            this.microsoft.authorized = true;
        }
    },
    methods: {
        initClient() {
            this.google.api.client
                .init({
                    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                    clientId: process.env.VUE_APP_GOOGLE_PUBLIC_KEY,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                })
                .then(() => {
                    // Listen for sign-in state changes.
                    this.google.api.auth2.getAuthInstance().isSignedIn.listen(this.google.authorized);
                });
        },
        handleGoogleSignInClick(event) {
            this.google.api.auth2
                .getAuthInstance()
                .signIn()
                .then(_ => {
                    this.google.authorized = true;

                    this.$toast.success("Kết Nối Thành Công");
                });
        },
        handleGoogleSignoutClick(event) {
            this.google.api.auth2
                .getAuthInstance()
                .signOut()
                .then(_ => {
                    this.google.authorized = false;

                    this.$toast.success("Ngắt Kết Nối Thành Công");
                });
        },
        generateUniqueID() {
            return Math.floor(Math.random() * 10000);
        },
        clearConsole() {
            this.console = "<p>Chào Bạn !</p>";
        },
        importGoogleCalendar() {
            if (!this.user.userSchedule) {
                return this.$toast.danger("TKB Trống Mà ༼ つ ◕_◕ ༽つ");
            }
            //clear console
            this.clearConsole();

            this.google.loadingBtn = true;
            // Create Calendar
            let timeCreated = dayjs().format("DD/MM/YYYY HH:ss");

            let ID = this.generateUniqueID();

            this.google.api.client.calendar.calendars
                .insert({
                    resource: {
                        summary: `KMA Schedule ${timeCreated} ${ID}`,
                        description: `KMA Schedule Generator Powerd By Phuc Dang \nID: ${ID} \nTạo Lúc: ${timeCreated} `,
                        timeZone: "Asia/Ho_Chi_Minh",
                    },
                })
                .then(res => {
                    // console.log(res.result.id)
                    this.console += `<p class="success--text text--lighten-3">[GOOGLE] --> Tạo Lịch Mới Thành Công ! Tên: KMA Schedule ${timeCreated} ${ID}</p>`;

                    const batch = this.google.api.client.newBatch();

                    this.console += `<p class="primary--text text--lighten-3">[GOOGLE] --> Chuẩn bị lịch học !</p>`;

                    this.user.userSchedule.forEach(a => {
                        let start = dayjs(a.day, "DD/MM/YYYY").format("YYYY-MM-DD") + "T" + convertLessonsToTime(a.lesson).start + ":00.000+07:00";
                        let end = dayjs(a.day, "DD/MM/YYYY").format("YYYY-MM-DD") + "T" + convertLessonsToTime(a.lesson).end + ":00.000+07:00";
                        let event = {
                            summary: a.subjectName,
                            location: a.room,
                            description: `Tiết: ${a.lesson} \nLớp: ${a.className} \nGiáo Viên: ${a.teacher}`,
                            start: {
                                dateTime: start,
                                timeZone: "Asia/Ho_Chi_Minh",
                            },
                            end: {
                                dateTime: end,
                                timeZone: "Asia/Ho_Chi_Minh",
                            },
                        };
                        batch.add(
                            this.google.api.client.calendar.events.insert({
                                calendarId: res.result.id,
                                resource: event,
                            }),
                        );
                    });

                    this.console += `<p class="success--text text--lighten-3">[GOOGLE] --> Chuẩn bị xong !</p>`;

                    this.console += `<p class="primary--text text--lighten-3">[GOOGLE] --> Bắt đầu gửi !</p>`;

                    batch
                        .then(() => {
                            this.console += `<p class="success--text text--lighten-3">[GOOGLE] --> <strong>Đồng bộ thành công ! </strong></p>`;
                            console.log("all jobs done!!!");
                        })
                        .catch(err => {
                            this.console += `<p class="danger--text text--lighten-3">[GOOGLE] --> <strong>Đồng bộ thất bại ! </strong></p> <p> ${err} </p>`;
                            throw new Error(err);
                        });
                })
                .catch(err => {
                    this.console += `<p class="danger--text text--lighten-3">[GOOGLE] --> Tạo Lịch Lỗi !</p> <p> ${err} </p>`;
                    throw new Error(err);
                });

            this.google.loadingBtn = false;
        },
        async handleMicrosoftSignIn() {
            const loginRequest = {
                scopes: ["openid", "profile", "user.read", "calendars.readwrite"],
            };
            try {
                let res = await this.microsoft.api.loginPopup(loginRequest);

                console.log("id_token acquired at: " + new Date().toString());

                // if (this.microsoft.api.getAccount()) {
                // 	this.microsoft.account = this.microsoft.api.getAccount();
                // 	this.microsoft.authorized = true;
                // }

                this.microsoft.account = res.account;
                this.microsoft.authorized = true;

                this.$toast.success("Kết Nối Thành Công");
            } catch (error) {
                console.log(error);
            }
        },
        handleMicrosoftSignOut() {
            this.microsoft.authorized = false;
            this.microsoft.account = null;
            this.$toast.success("Ngắt Kết Nối Thành Công");
            this.microsoft.api.logout();
        },
        async ImportMicrosoftCalendar() {
            const options = new MicrosoftGraph.MSALAuthenticationProviderOptions(["user.read", "calendars.readwrite"]); //eslint-disable-line
            const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(this.microsoft.api, options); //eslint-disable-line
            const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider }); //eslint-disable-line

            let timeCreated = dayjs().format("DD/MM/YYYY HH:ss");

            let ID = this.generateUniqueID();
            this.clearConsole();

            this.microsoft.loadingBtn = true;

            try {
                let calendar = await graphClient.api("/me/calendars").post({
                    Name: `KMA Schedule ${timeCreated} ${ID}`,
                });

                this.console += `<p class="success--text text--lighten-3">[MICROSOFT] --> Tạo Lịch Thành Công ! Tên: KMA Schedule ${timeCreated} ${ID} </p>`;

                this.user.userSchedule.forEach(async (a, index) => {
                    setTimeout(async () => {
                        let start = dayjs(a.day, "DD/MM/YYYY").format("YYYY-MM-DD") + "T" + convertLessonsToTime(a.lesson).start + ":00";
                        let end = dayjs(a.day, "DD/MM/YYYY").format("YYYY-MM-DD") + "T" + convertLessonsToTime(a.lesson).end + ":00";
                        let event = {
                            subject: a.subjectName,
                            body: {
                                contentType: "HTML",
                                content: `Tiết: ${a.lesson} <br>Lớp: ${a.className} <br>Giáo Viên: ${a.teacher}`,
                            },
                            start: {
                                dateTime: start,
                                timeZone: "Asia/Bangkok",
                            },
                            end: {
                                dateTime: end,
                                timeZone: "Asia/Bangkok",
                            },
                            location: {
                                displayName: a.room,
                                address: {
                                    city: "Hà Nội",
                                    countryOrRegion: "Việt Nam",
                                    postalCode: "100000",
                                    state: "Thanh Xuân",
                                    street: "141 Chiến Thắng",
                                },
                            },
                        };
                        let eventCall = await graphClient.api(`/me/calendars/${calendar.id}/events`).post(event);

                        this.console += `<p class="success--text text--lighten-3">[MICROSOFT] --> Nhập Event ${index + 1} ${a.subjectName} Thành Công !</p>`;

                        if (index + 1 == this.user.userSchedule.length) {
                            this.console += `<p class="success--text text--lighten-3">[MICROSOFT] --> <strong>Đồng Bộ Hoá Xong</strong></p>`;
                            this.microsoft.loadingBtn = false;
                        }
                    }, 500 * index);
                });
            } catch (err) {
                this.console += `<p class="danger--text text--lighten-2">[MICROSOFT] --> Tạo Lịch Thất Bại Hoặc Nhập Thất Bại</p>`;
                this.microsoft.loadingBtn = false;
            }
        },
    },
    mounted() {
        let firstTime = true;
        let container = document.getElementsByClassName("console");
        if (firstTime) {
            container.scrollTop = container.scrollHeight;
            firstTime = false;
        } else if (container.scrollTop + container.clientHeight === container.scrollHeight) {
            container.scrollTop = container.scrollHeight;
        }
    },
};
</script>

<style></style>
