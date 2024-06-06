<template>
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
        ><v-btn width="100%" type="submit" color="red-darken-2">Đăng ký</v-btn>
        <p class="text-center pa-3">
          Bạn đã có tài khoản?
          <span class="text-red-darken-4 cursor-pointer">Đăng nhập</span>
        </p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/.test(v) || "Password must like Ab123",
      ],
    };
  },
  methods: {
    async register() {
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
};
</script>
