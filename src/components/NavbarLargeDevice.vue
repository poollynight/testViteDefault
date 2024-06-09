<template>
  <!-- Header -->
  <div class="bg-red-darken-4 app-header" v-if="$vuetify.display.mdAndUp">
    <!-- Top header -->
    <v-row class="">
      <v-container>
        <v-row class="d-flex" align="center" justify="center">
          <v-col class="text-center"><p>Nước hoa cho mọi tầng lớp</p></v-col>
        </v-row>
      </v-container>
    </v-row>
    <!-- Bottom header -->
    <v-toolbar
      class="v-toolbar v-toolbar--flat v-toolbar--density-default border-b v-theme--light v-locale--is-ltr v-app-bar border-b"
    >
      <v-container>
        <v-row align="center">
          <v-col
            @click="backHome"
            cols="3"
            md="2"
            class="text-red-darken-2 d-inline-flex justify-center text-h5"
          >
            <router-link
              class="text-red-darken-2 text-decoration-none font-weight-bold brand-name"
              to="/"
            >
              <p class="text-decoration-none font-weight-bold brand-name">
                ODOUR
              </p>
            </router-link>
          </v-col>
          <v-col cols="8" v-if="!($route.path === '/login')">
            <v-tabs
              class="d-flex justify-center"
              v-model="tab"
              align-tabs="center"
              color="red"
            >
              <router-link class="text-decoration-none text-black" to="/">
                <v-tab ref="home">
                  <p class="tab">Trang chủ</p>
                </v-tab></router-link
              >

              <router-link
                v-for="(cate, index) in navigatorLg"
                :key="index"
                :items="cate"
                class="text-decoration-none text-black"
                :to="cate.value"
              >
                <v-tab>
                  <p class="tab">{{ cate.title }}</p>
                </v-tab></router-link
              >
            </v-tabs>
          </v-col>
          <v-col
            cols="2"
            color="success"
            class="col-3 d-flex justify-space-between"
          >
            <p></p>
            <router-link
              to="/user/cart"
              class="text-decoration-none text-black"
              v-if="isLogin"
            >
              <v-icon class="text-h5">mdi-cart</v-icon>
            </router-link>
            <router-link
              to="/login"
              class="text-red-darken-2"
              v-if="isLogin == false && $route.path !== '/login'"
            >
              Đăng nhập
            </router-link>
            <ProfileIcon v-if="isLogin"></ProfileIcon>

            <router-link
              to="/login"
              class="text-decoration-none"
              v-if="isLogin"
            >
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </div>
</template>
<script>
import ProfileIcon from "./NavbarProfileIcon.vue";

export default {
  components: {
    ProfileIcon,
  },
  data() {
    return {
      tab: null,
      isLogin: false,
      navigatorLg: [
        {
          title: "Mua sắm",
          value: "/shop",
        },
        {
          title: "Giới thiệu",
          value: "/about",
        },
        {
          title: "Liên hệ",
          value: "/contact",
        },
      ],
    };
  },
  methods: {
    backHome() {
      this.$refs.home.$el.click();
    },
    checkLogin() {
      if (this.$cookies.get("ato")) {
        this.isLogin = true;
        this.checkConfirmEmail;
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
<style>
.tab {
  font-size: 1em;
}
.brand-name {
  font-size: 2rem;
}
.app-header {
  z-index: 1010;
}
</style>
