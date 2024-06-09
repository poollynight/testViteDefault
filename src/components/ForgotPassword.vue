<template>
  <v-container fluid id="" class="background">
    <v-row justify="center">
      <v-col cols="10" md="4" sm="5" align="center">
        <v-sheet class="bg-white rounded form">
          <h1 class="pa-4">Quên mật khẩu</h1>
          <v-form @submit.prevent="ForgotPassword">
            <p class="text-red">
              Nhập địa chỉ email để nhận link quên mật khẩu
            </p>
            <v-text-field
              v-model="email"
              label="Gmail"
              required
              class="pa-4"
              width="auto"
              :rules="emailRules"
            ></v-text-field>

            <v-row no-gutters class="pa-4">
              <v-col cols="12"
                ><v-btn width="100%" type="submit" color="red-darken-2"
                  >Xác nhận</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- Success dialog when send mail success (after loading) -->
    <div class="pa-4 text-center">
      <v-dialog
        v-model="loadSuccessDialog"
        max-width="450"
        max-height="400"
        persistent
      >
        <v-list
          class="py-2"
          color="primary"
          align="center"
          elevation="12"
          rounded="lg"
        >
          <v-list-item>
            <template v-slot:prepend>
              <div class="pe-4" align="center">
                <v-fab
                  key="success"
                  color="success"
                  icon="mdi-share-variant"
                  class="mb-4"
                  location="start start"
                  size="50"
                  app
                  appear
                  ><v-icon>mdi-check</v-icon></v-fab
                >
              </div>
            </template>
            <p class="text-center pa-4">
              Một email đã được gửi qua địa chỉ này.<br />Vui lòng kiểm tra!
            </p>
            <v-btn
              @click="
                loadSuccessDialog = false;
                $route.push('/login');
              "
              class="mb-1"
              >Đóng</v-btn
            >
          </v-list-item>
        </v-list>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loadSuccessDialog: false,
      emailRules: [
        (v) => !!v || "Vui lòng nhập Email",
        (v) => /.+@.+\..+/.test(v) || "Email sai định dạng",
      ],
      email: "",
    };
  },
  methods: {
    checkLogin() {
      if (this.$cookies.get("ato")) {
        this.$isLogin = true;
        this.$router.push("/");
      }
    },
    async ForgotPassword() {
      if (
        this.email === ""
      )
        return;
      try {
        // Make your login request here using axios or any other library
        const response = await axios.post(
          `https://main.odour.site/auth/forgotPassword`,
          {
            email: this.email,
          }
        );
        this.loadSuccessDialog = true;
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
