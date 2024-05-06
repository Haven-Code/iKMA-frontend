<!-- @format -->

<template>
    <v-container fluid class="fill-height" :class="!darkMode ? 'grey lighten-4' : ''">
        <v-row align="center" justify="center">
            <v-col cols="11" md="7" lg="5">
                <v-card min-height="40vh" class="py-5 px-11 ppx-rounded-xl ppx-shadow-xl">
                    <v-tabs v-model="tab" center-active align-with-title>
                        <v-tab href="#tab-1">
                            Mã sinh viên (GA)
                        </v-tab>
                        <v-tab href="#tab-2">
                            Form chọn tên
                        </v-tab>
                        <v-tab href="#tab-3">Sử dụng tài khoản ACTVN</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1">
                            <v-alert type="warning" class="mt-5"> Trong trường hợp bị lỗi, vui lòng sử dụng <strong>Form chọn tên</strong> để lấy thời khoá biểu. </v-alert>

                            <v-form ref="noAccountStudentCodeForm" v-model="noAccountStudentCode.valid" lazy-validation class="ppx-mt-5">
                                <v-text-field
                                    :disabled="form.loading"
                                    v-on:keyup.enter="getScheduleByStudentCode()"
                                    v-model="noAccountStudentCode.studentCode"
                                    :rules="form.rules.studentCode"
                                    label="Mã Sinh Viên"
                                    outlined
                                    prepend-inner-icon="mdi-account"
                                    required
                                />

                                <v-select v-model="noAccountStudentCode.semester" :items="noAccountSelectItems.semester" label="Năm học" :rules="form.rules.studentCode" outlined></v-select>

                                <v-btn class="ppx-rounded-lg ppx-h-11 mt-3" :loading="form.loading" color="purple" dark block @click="getScheduleByStudentCode">
                                    <v-icon class="mr-2">mdi-login-variant</v-icon>
                                    <span class="text-body-1">Lấy thời khoá biểu </span>
                                </v-btn>
                            </v-form>
                        </v-tab-item>

                        <v-tab-item value="tab-2">
                            <v-form ref="noAccountForm" v-model="noAccountForm.valid" lazy-validation class="mt-5">
                                <v-row align="center">
                                    <v-col class="d-flex" cols="12" sm="6">
                                        <v-select
                                            v-model="noAccountForm.academicYear"
                                            :items="noAccountSelectItems.academicYear"
                                            label="Khoá"
                                            :rules="form.rules.studentCode"
                                            outlined
                                            @change="getStudentClass"
                                        />
                                    </v-col>

                                    <v-col class="d-flex" cols="12" sm="6">
                                        <v-select
                                            v-model="noAccountForm.studentClass"
                                            :items="noAccountSelectItems.studentClass"
                                            label="Lớp"
                                            :rules="form.rules.studentCode"
                                            outlined
                                            @change="getStudent"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row align="center">
                                    <v-col class="d-flex" cols="12" sm="6">
                                        <v-select v-model="noAccountForm.students" :items="noAccountSelectItems.students" label="Sinh viên" :rules="form.rules.studentCode" outlined></v-select>
                                    </v-col>

                                    <v-col class="d-flex" cols="12" sm="6">
                                        <v-select v-model="noAccountForm.semester" :items="noAccountSelectItems.semester" label="Năm học" :rules="form.rules.studentCode" outlined></v-select>
                                    </v-col>
                                </v-row>

                                <v-btn class="ppx-rounded-lg ppx-h-11 mt-3" :loading="form.loading" color="purple" dark block @click="getStudentSchedule">
                                    <v-icon class="mr-2">mdi-login-variant</v-icon>
                                    <span class="text-body-1">Lấy TKB</span>
                                </v-btn>
                            </v-form>
                        </v-tab-item>

                        <v-tab-item value="tab-3">
                            <p class="mt-8 text-center text-h5 font-weight-light">
                                Đăng Nhập Bằng Tài Khoản
                                <strong>ACTVN</strong>
                            </p>

                            <v-img class="mt-5 mx-auto" src="@/assets/logo.png" width="6rem" height="6rem" alt="KMA Schedule Logo"></v-img>

                            <v-form ref="form" v-model="form.valid" lazy-validation class="mt-5">
                                <v-text-field
                                    :disabled="form.loading"
                                    v-on:keyup.enter="login()"
                                    class="ppx-rounded-lg"
                                    v-model="form.studentCode"
                                    :rules="form.rules.studentCode"
                                    label="Mã Sinh Viên"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-account"
                                    required
                                />

                                <v-text-field
                                    :disabled="form.loading"
                                    v-on:keyup.enter="login()"
                                    class="ppx-rounded-lg mt-n3"
                                    v-model="form.password"
                                    type="password"
                                    :rules="form.rules.password"
                                    label="Mật Khẩu"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-account-key"
                                    required
                                />

                                <v-btn class="ppx-rounded-lg ppx-h-11 mt-3" :loading="form.loading" color="purple" dark block @click="login">
                                    <v-icon class="mr-2">mdi-login-variant</v-icon>
                                    <span class="text-body-1">Đăng Nhập</span>
                                </v-btn>
                            </v-form>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
    name: "Auth",
    data: () => ({
        tab: null,
        noAccountForm: {
            valid: null,
            academicYear: null,
            studentClass: null,
            students: null,
            semester: null,
        },
        noAccountStudentCode: {
            studentCode: null,
            semester: null,
            valid: null,
        },
        form: {
            valid: null,
            rules: {
                studentCode: [v => !!v || "Bắt Buộc Mã Sinh Viên"],
                password: [v => !!v || "Bắt Buộc Mật Khẩu"],
            },
            studentCode: null,
            password: null,
            loading: false,
        },
        darkMode: null,
        noAccountSelectItems: {
            academicYear: [],
            studentClass: [],
            students: [],
            semester: [],
        },
    }),
    computed: {
        ...mapState(["user", "config"]),
        axiosInstance() {
            return axios.create({
                baseURL: process.env.VUE_APP_BETA_API_URL,
            });
        },
    },
    metaInfo: {
        title: "Đăng Nhập",
        titleTemplate: " %s | iKMA",
    },
    methods: {
        login() {
            this.form.loading = true;

            if (this.$refs.form.validate()) {
                const param = {
                    username: this.form.studentCode,
                    password: this.form.password,
                };

                const header = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                };

                axios
                    .post(process.env.VUE_APP_API_URL, param, header)
                    .then(res => {
                        const { code, data } = res.data;

                        if (code == 403 || !data) {
                            this.form.loading = false;
                            return this.$toast.error("<strong>Lỗi</strong>: Sai tài khoản hoặc mật khẩu!");
                        } else if (code == 401) {
                            this.form.loading = false;
                            return this.$toast.error("<strong>Lỗi</strong>: Website trường lỗi! Thử lại sau ít phút!");
                        }

                        // const { studentInfo, studentSchedule } = data;

                        // console.log(studentInfo);
                        // console.log(studentSchedule);

                        this.$store.dispatch("login", data);

                        this.$toast.success("Đăng Nhập Thành Công");

                        setTimeout(() => {
                            this.$router.push({
                                name: "Home",
                            });
                        }, 1000);
                    })
                    .catch(err => {
                        this.form.loading = false;

                        this.$toast.error("<strong>Lỗi</strong>: " + err);

                        throw new Error(err);
                    });
            } else {
                this.$toast.error("Thiếu Gì Rùi!");
                this.form.loading = false;
            }
        },
        getAcademicYear() {
            this.axiosInstance
                .get(`academic-year`)
                .then(res => {
                    const { data } = res.data;

                    this.noAccountSelectItems.academicYear = data.map(item => {
                        return {
                            text: item.name,
                            value: item._id,
                        };
                    });
                })
                .catch(err => {
                    this.$toast.error("<strong>Lỗi</strong>: " + err);
                    throw new Error(err);
                });
        },
        getSemester() {
            this.axiosInstance
                .get("semester")
                .then(res => {
                    const { data } = res.data;

                    this.noAccountSelectItems.semester = data.map(item => {
                        return {
                            text: item.name,
                            value: item.hash,
                        };
                    });
                })
                .catch(err => {
                    this.$toast.error("<strong>Lỗi</strong>: " + err);
                    throw new Error(err);
                });
        },
        getStudentClass(id) {
            this.axiosInstance
                .get(`student-class/find-by-academic-year/${id}`)
                .then(res => {
                    const { data } = res.data;

                    this.noAccountSelectItems.studentClass = data.map(item => {
                        return {
                            text: item.name,
                            value: item._id,
                        };
                    });
                })
                .catch(err => {
                    this.$toast.error("<strong>Lỗi</strong>: " + err);
                    throw new Error(err);
                });
        },
        getStudent(id) {
            this.axiosInstance
                .get(`student/find-by-student-class/${id}`)
                .then(res => {
                    const { data } = res.data;

                    this.noAccountSelectItems.students = data.map(item => {
                        return {
                            text: item.name,
                            value: item.hash,
                        };
                    });
                })
                .catch(err => {
                    this.$toast.error("<strong>Lỗi</strong>: " + err);
                    throw new Error(err);
                });
        },
        getStudentSchedule() {
            if (this.$refs.noAccountForm.validate()) {
                this.form.loading = true;

                this.axiosInstance
                    .post(`schedule/get-student-schedule`, {
                        studentHash: this.noAccountForm.students,
                        semesterHash: this.noAccountForm.semester,
                    })
                    .then(res => {
                        const { data } = res.data;

                        this.$store.dispatch("login", data);

                        this.$toast.success("Đăng Nhập Thành Công");

                        setTimeout(() => {
                            this.$router.push({
                                name: "Home",
                            });
                        }, 1000);
                    })
                    .catch(err => {
                        this.$toast.error("<strong>Lỗi</strong>: " + err.response.data.message || err.message);
                        console.error(err);
                    })
                    .finally(() => {
                        this.form.loading = false;
                    });
            }
        },
        getScheduleByStudentCode() {
            if (this.$refs.noAccountStudentCodeForm.validate()) {
                this.form.loading = true;

                this.axiosInstance
                    .post(`schedule/get-student-schedule-by-student-code`, {
                        studentCode: this.noAccountStudentCode.studentCode,
                        semesterHash: this.noAccountStudentCode.semester,
                    })
                    .then(res => {
                        const { data } = res.data;

                        this.$store.dispatch("login", data);

                        this.$toast.success("Đăng Nhập Thành Công");

                        setTimeout(() => {
                            this.$router.push({
                                name: "Home",
                            });
                        }, 1000);
                    })
                    .catch(err => {
                        this.$toast.error("<strong>Lỗi</strong>: " + err.response.data.message || err.message);
                        console.error(err);
                    })
                    .finally(() => {
                        this.form.loading = false;
                    });
            }
        },
    },
    created() {
        if (this.config.darkMode === null) {
            let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false;
            this.$vuetify.theme.dark = theme;
            this.$store.dispatch("toggleDarkMode", theme);
            this.darkMode = theme;
        } else {
            this.$vuetify.theme.dark = this.config.darkMode || false;
            this.darkMode = this.config.darkMode || false;
        }
    },
    mounted() {
        this.getAcademicYear();
        this.getSemester();
    },
};
</script>

<style lang="scss" scoped></style>
