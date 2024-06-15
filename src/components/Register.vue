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
                  <span
                    class="text-red-darken-4 cursor-pointer"
                    @click="toLoginPage()"
                    >Đăng nhập</span
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
                  ><v-icon>mdi-check</v-icon></v-fab
                >
              </div>
            </template>
            <p class="text-center pa-4">
              Email xác thực đã được gửi qua email này.<br />Hãy xác thực tài
              khoản trước <strong>48h</strong>.<br /><strong class="text-red"
                >Nếu không tài khoản sẽ bị xóa!</strong
              >
            </p>
            <v-btn
              @click="
                loadSuccessDialog = false;
                this.$router.push('/login');
              "
              class="mb-1"
              >Đóng</v-btn
            >
          </v-list-item>
        </v-list>
      </v-dialog>
    </div>

    <!-- Error dialog -->
    <div class="pa-4 text-center">
      <v-dialog
        v-model="loadErrorDialog"
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
            <p class="text-center pa-4 text-red">
              <strong>{{ returnErrorMessage }}</strong>
            </p>
            <v-btn @click="loadErrorDialog = false" class="mb-1">Đóng</v-btn>
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
      errorMessages: "",
      loadErrorDialog: false,
      loadDialog: false,
      loadSuccessDialog: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      emailRules: [
        (v) => !!v || "Email không được để trống",
        (v) => /.+@.+\..+/.test(v) || "Email sai định dạng",
      ],
      passwordRules: [
        (v) => !!v || "Mật khẩu không được để trống",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/.test(v) ||
          "Mật khẩu phải đúng định dạng. VD: Ab123",
      ],
    };
  },
  computed: {
    returnErrorMessage() {
      return this.errorMessages;
    },
  },
  methods: {
    async register() {
      if (
        this.password === "" ||
        this.confirmPassword === "" ||
        this.email === ""
      )
        return;
      if (this.password === this.confirmPassword) {
        this.loadDialog = true;
        try {
          const response = await axios.post(
            "https://main.odour.site/auth/register",
            {
              email: this.email,
              password: this.password,
              // confirmPassword: this.confirmPassword,
            }
          );
          this.loadDialog = false;
          this.loadSuccessDialog = true;
        } catch (error) {
          if (error.response) {
            if (error.response.status == 409) {
              this.loadDialog = false;
              this.errorMessages = "Tài khoản đã tồn tại";
              this.loadErrorDialog = true;
            }
          } else if (error.request) {
            // The request was made but no response was received
            this.errorMessages = "Lỗi kết nối server!";
            this.loadErrorDialog = true;
            console.error("No response received from the server");
          } else {
            // Something happened in setting up the request that triggered an error
            this.errorMessages = "Lỗi!";
            this.loadErrorDialog = true;
            console.error("Error message:", error.message);
          }
        }
      } else {
        this.errorMessages = "Mật khẩu không trùng khớp!";
        this.loadErrorDialog = true;
      }
    },
    toLoginPage() {
      if (
        this.$route.query.redirect !== "/logout" &&
        this.$route.query.redirect !== undefined
      )
        this.$router.push("/login?redirect=" + this.$route.query.redirect);
      else this.$router.push("/login");
    },
  },
  watch: {
    loadSuccessDialog(val) {
      if (!val) return;
      setTimeout(() => (this.loadSuccessDialog = false), 3000);
    },
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
