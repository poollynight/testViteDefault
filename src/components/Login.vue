<template>
  <v-container fluid id="" class="background">
    <v-row justify="center">
      <v-col cols="10" md="4" sm="5" justify="center" align="center">
        <v-sheet class="bg-white rounded form">
          <h1 class="pa-4">Đăng nhập</h1>
          <v-form @submit.prevent="Login">
            <v-text-field
              v-model="email"
              label="Gmail"
              required
              class="pa-4"
              width="auto"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Mật khẩu"
              type="password"
              required
              class="pa-4"
              width="auto"
            ></v-text-field>
            <v-checkbox
              class="pl-4"
              v-model="rememberMe"
              label="Remember Me"
            ></v-checkbox>
            <v-row no-gutters class="pa-4">
              <v-col cols="12"
                ><v-btn width="100%" type="submit" color="red-darken-2"
                  >Đăng nhập</v-btn
                >
                <p class="text-center pa-3"><router-link class="text-red-darken-4" to="/forgotPassword">Quên mật khẩu?</router-link></p>
                <p class="text-center pa-3">
                  Bạn mới biết đến Odour?
                  <router-link to="/register" class="text-red-darken-4"
                    >Đăng ký</router-link
                  >
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      formVisible: true,
      email: "",
      password: "",
      rememberMe: false,
      statusCode: null,
    };
  },
  methods: {
    checkLogin() {
      if (this.$cookies.get("ato")) {
        this.$isLogin = true;
      }
    },
    async Login() {
      try {
        // Make your login request here using axios or any other library
        const response = await axios.post(
          `https://main.odour.site/auth/login`,
          {
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe,
          }
        );

        // Handle the response here
        localStorage.setItem("avatar", response.data.body.user.avatarUrl);
        $cookies.set("ato", response.data.body.accessToken, "30d", "/");
        $cookies.set("e", response.data.body.user.email, "30d", "/");
        $cookies.set("rt", response.data.body.refreshToken, "30d", "/");
        $cookies.set(
          "confe",
          response.data.body.user.emailConfirmed,
          "30d",
          "/"
        );
        this.$isLogin = true; // global variable
        // location.reload();
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
<style>
.background {
  background-image: url("https://res.cloudinary.com/dsyysapur/image/upload/v1717643041/ODOUR_EXE/SYSTEM/carousel_4_ewbnny.jpg");
  background-size: cover;
  min-height: 90vh;
}
.form {
  width: 100%;
}
</style>
