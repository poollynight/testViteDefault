<template>
  <!--navbar show on small devices -->
  <div v-if="$vuetify.display.smAndDown">
    <v-app-bar color="red-darken-4" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
        <v-icon>mdi-format-list-bulleted</v-icon></v-app-bar-nav-icon
      >
      <router-link to="/" class="text-decoration-none text-white">
        <v-toolbar-title>Odour</v-toolbar-title></router-link
      >
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <v-list>
        <v-list-item v-for="item in navigator" :key="item.title">
          <router-link :to="item.value" class="text-decoration-none text-black">
            {{ item.title }}
          </router-link>
          <!-- end list navbar -->
        </v-list-item>
        <v-list-item>
          <!-- quan li gio hang -->
          <router-link to="/user/cart" class="text-decoration-none text-black">
            Giỏ hàng
          </router-link>
        </v-list-item>
        <v-list-item v-if="isLogin == false">
          <!-- quan li tai khoan -->
          <router-link to="/login" class="text-decoration-none text-black">
            Đăng nhập
          </router-link>
        </v-list-item>
        <div v-if="isLogin">
          <v-list-item v-for="(item, index) in selfManage" :key="index">
            <router-link
              :to="'/' + item.value"
              class="text-decoration-none text-black"
              ><v-list-item-title>{{
                item.title
              }}</v-list-item-title></router-link
            >
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "NavbarSmallDevice",
  isLogin: false,

  data() {
    return {
      isLogin: false,
      drawer: false,
      selfManage: [
        { title: "Quản lí tài khoản", value: "user/profile" },
        { title: "Đơn hàng của tôi", value: "user/orders/?type=0" },
        { title: "Đăng xuất", value: "logout" },
      ],
      navigator: [
        {
          title: "Trang chủ",
          value: "/",
        },
        {
          title: "Mua sắm",
          value: "/shop?categoryId=0",
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
<style></style>
