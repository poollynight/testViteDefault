<template>
  <v-container fluid id="background">
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
                <p class="text-center pa-3">
                  Bạn mới biết đến Odour?
                  <span class="text-red-darken-4 cursor-pointer">Đăng ký</span>
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
        console.log(response.data);
        console.log(response.status);
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
};
</script>
<style>
#background {
  background-image: url("/src/assets/carousel_4.jpg");
  background-size: cover;
  min-height: 90vh;
}
.form {
  width: 100%;
}
</style>
