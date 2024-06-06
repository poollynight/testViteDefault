<template>
  <v-container fluid class="background">
    <v-row justify="center">
      <v-col cols="10" md="4" sm="5" justify="center" align="center">
        <v-sheet class="bg-white rounded form">
          <h1 class="pa-4">Đăng ký</h1>
          <v-form @submit.prevent="register">
            <v-text-field
              v-model="email"
              label="Gmail"
              required
              class="pa-4"
              width="auto"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Mật khẩu"
              type="password"
              required
              class="pa-4"
              width="auto"
              :rules="passwordRules"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              required
              class="pa-4"
              width="auto"
              :rules="passwordRules"
            ></v-text-field>
            <v-row no-gutters class="pa-4">
              <v-col cols="12"
                ><v-btn width="100%" type="submit" color="red-darken-2"
                  >Đăng ký</v-btn
                >
                <p class="text-center pa-3">
                  Bạn đã có tài khoản?
                  <router-link
                    to="/login"
                    class="text-red-darken-4"
                    >Đăng nhập</router-link
                  >
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- loading dialog when click signup and all conditions meet -->
    <div class="pa-4 text-center">
      <v-dialog
        v-model="loadDialog"
        max-width="320"
        max-height="300"
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
            <p class="text-center">
              Mọi thứ đang được thực hiện. <br />
              Vui lòng đợi...
            </p>
            <v-progress-circular
              class="mt-3"
              color="primary"
              indeterminate="disable-shrink"
              size="50"
              width="2"
            ></v-progress-circular>
          </v-list-item>
        </v-list>
      </v-dialog>
    </div>

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
                  ><v-icon>mdi-check</v-icon></v-fab>
              </div>
            </template>
            <p class="text-center pa-4">
              Email xác thực đã được gửi qua email này.<br />Hãy xác thực tài
              khoản trước <strong>48h</strong>.<br /><strong class="text-red"
                >Nếu không tài khoản sẽ bị xóa!</strong
              >
            </p>
            <v-btn @click="loadSuccessDialog = false" class="mb-1">Đóng</v-btn>
          </v-list-item>
        </v-list>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loadDialog: false,
      loadSuccessDialog: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/.test(v) ||
          "Password must like Ab123",
      ],
    };
  },
  methods: {
    async register() {
      this.loadDialog = true;
      if (
        this.password === "" ||
        this.confirmPassword === "" ||
        this.email === ""
      )
        return;
      if (this.password === this.confirmPassword) {
        try {
          const response = await axios.post(
            "https://main.odour.site/auth/register",
            {
              email: this.email,
              password: this.password,
              // confirmPassword: this.confirmPassword,
            }
          );
          console.log("Registration successful!", response.data);
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from the server");
          } else {
            // Something happened in setting up the request that triggered an error
            console.error("Error message:", error.message);
          }
        }
      } else {
        console.error("Passwords do not match");
      }
    },
  },
  watch: {
    loadDialog(val) {
      if (!val) return;
      setTimeout(() => (this.loadDialog = false), 2000);
      setTimeout(() => (this.loadSuccessDialog = true), 2000);
    },
    // loadSuccessDialog(val) {
    //   if (!val) return;
    //   setTimeout(() => (this.loadSuccessDialog = false), 2000);
    // },
  },
};
</script>
<style>
#background {
  background-image: url("https://res.cloudinary.com/dsyysapur/image/upload/v1717643041/ODOUR_EXE/SYSTEM/carousel_4_ewbnny.jpg");
  background-size: cover;
  min-height: 90vh;
}
</style>
