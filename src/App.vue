<template>
  <v-app>
    <!-- <test></test> -->
    <v-card>
      <NavbarLargeDevice
        :cartNumber="cartNumber"
        @update-cart-number="updateCartNumber"
      ></NavbarLargeDevice>
      <NavbarSmallDevice></NavbarSmallDevice>
      <v-main class="bg-blue-grey-lighten-5" min-height="90vh">
        <!-- load content -->
        <router-view
          @add-to-cart="incrementCartNumber"
          @remove-from-cart="decrementCartNumber"
          style="overflow-x: auto"
        />
        <!-- Load dialog if user hasn't confirmed email yet -->
        <div class="pa-4 text-center">
          <v-dialog
            v-model="loadEmailConfirmationDialog"
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
                <p class="text-center pa-4">
                  Có vẻ bạn chưa xác thực tài khoản.<br />Hãy xác thực tài khoản
                  trước <strong>48h</strong>.<br /><strong class="text-red"
                    >Nếu không tài khoản sẽ bị xóa!</strong
                  >
                </p>
                <v-btn
                  color="success"
                  @click="resendConfirmEmail"
                  class="mb-1 mr-2"
                  >Gửi lại email xác thực</v-btn
                >
                <v-btn @click="loadEmailConfirmationDialog = false" class="mb-1"
                  >Đóng</v-btn
                >
              </v-list-item>
            </v-list>
          </v-dialog>
        </div>
      </v-main>
      <Footer></Footer>
    </v-card>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import test from "./components/testComp.vue";
import NavbarLargeDevice from "./components/NavbarLargeDevice.vue";
import NavbarSmallDevice from "./components/NavbarSmallDevice.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    test,
    Footer,
    NavbarLargeDevice,
    NavbarSmallDevice,
  },

  data: () => ({
    loadEmailConfirmationDialog: false,
    isLogin: false,
    cartNumber: 0,
    cartItem: [],
  }),
  methods: {
    incrementCartNumber(quantity) {
      this.cartNumber += quantity;
    },
    decrementCartNumber(quantity) {
      this.cartNumber -= quantity;
    },
    updateCartNumber(newCartNumber) {
      this.cartNumber = newCartNumber;
    },
    checkConfirmEmail() {
      if (this.$cookies.get("confe") == "false") {
        this.loadEmailConfirmationDialog = true;
      } else this.loadEmailConfirmationDialog = false;
    },
    async resendConfirmEmail() {
      this.$cookies.set("email", "chienthang@gmail.com", "30d", "/");
      try {
        await axios.post(
          "https://main.odour.site/auth/resendConfirmationEmail",
          {
            email: $cookies.get("email"),
          }
        );
      } catch (error) {
        console.error("There was an error!", error);
      }
    },

    async getCartFromAPI() {
      if (this.$cookies.get("ato") === null) {
        try {
          const res = await axios.get("https://main.odour.site/guest/cart", {
            withCredentials: true,
          });
          console.log(res.data.body.orderItems);
          this.cartItem = res.data.body.orderItems;
          this.cartItem.forEach((element) => {
            this.cartNumber += element.quantity;
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await axios.get("https://main.odour.site/user/cart", {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          });
          this.cartItem = res.data.body.orderItems;
          this.cartItem.forEach((element) => {
            this.cartNumber += element.quantity;
          });
        } catch (err) {
          console.log(err);
          if (err.response.status == 401) {
            this.refreshToken();
          }
        }
      }
    },

    async refreshToken() {
      try {
        const response = await axios.post(
          "https://main.odour.site/auth/refreshAccessToken",
          {
            refreshToken: this.$cookies.get("rt"),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          }
        );
        this.$cookies.set("ato", response.data.body.newAccessToken);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    async syncGuestCart() {
      try {
        const response = await axios.get(
          `https://main.odour.site/guest/cart/sync`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          },
          { withCredentials: true }
        );
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
  mounted() {
    // this.$cookies.set("confe", "false", "30d", "/");
    this.getCartFromAPI();
    this.checkConfirmEmail();
  },
};
</script>
