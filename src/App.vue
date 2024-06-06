<template>
  <v-app>
    <v-card>
      <!-- Header -->
      <div class="bg-red-darken-4 app-header" v-if="$vuetify.display.mdAndUp">
        <!-- Top header -->
        <v-row class="" >
          <v-container>
            <v-row class="d-flex" align="center" justify="center">
              <v-col class="text-center"
                ><p>Nước hoa cho mọi tầng lớp</p></v-col
              >
            </v-row>
          </v-container>
        </v-row>

        <!-- Bottom header -->
        <v-toolbar
          class="v-toolbar v-toolbar--flat v-toolbar--density-default border-b v-theme--light v-locale--is-ltr v-app-bar border-b"
        >
          <v-row align="center">
            <v-col
              @click="backHome"
              cols="3"
              xs="2"
              md="3"
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
            <v-col cols="6">
              <v-tabs
                class="d-flex justify-center"
                v-model="tab"
                align-tabs="center"
                color="red"
              >
                <router-link class="text-decoration-none text-black" to="/">
                  <v-tab ref="home">
                    <p class="tab">Home</p>
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
              cols="1"
              color="success"
              class="col-3 d-flex justify-space-between"
            >
              <p></p>
              <router-link to="/cart" class="text-decoration-none text-black">
                <v-btn><v-icon class="text-h5">mdi-cart</v-icon></v-btn>
              </router-link>
              <router-link to="/login" class="text-decoration-none text-black">
                <v-btn @click="loadLoginTab"
                  ><v-icon class="text-h5">mdi-account</v-icon></v-btn>
              </router-link>
              <router-link to="/login" class="text-decoration-none">
                <v-avatar :image="avatar" size="40"></v-avatar>
              </router-link>
            </v-col>
          </v-row>
        </v-toolbar>
      </div>

      <!-- show on small devices -->
      <div v-if="$vuetify.display.smAndDown">
        <v-app-bar color="red-darken-4" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
            <v-icon>mdi-format-list-bulleted</v-icon></v-app-bar-nav-icon
          >

          <v-toolbar-title>Odour</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list>
            <v-list-item v-for="item in navigator" :key="item.title">
              <router-link
                :to="item.value"
                class="text-decoration-none text-black"
              >
                {{ item.title }}
              </router-link>
            </v-list-item></v-list
          >
        </v-navigation-drawer>
      </div>
      <v-main class="bg-blue-grey-lighten-5" min-height="90vh">
        <!-- <Shop v-if="ShopSelected" @load-product="loadProductTab"></Shop> -->
        <!-- <Product
          v-if="componentName == 'Product'"
          :item="componentParam"
          :products="products"
        ></Product>
        <component :is="component" /> -->
        <router-view />
      </v-main>
      <Footer></Footer>
    </v-card>
  </v-app>
</template>

<script>
import Cart from "./components/Cart.vue";
import Login from "./components/Login.vue";
import Product from "./components/Product.vue";
import Shop from "./components/Shop.vue";
import Home from "./components/Home.vue";
import Footer from "./components/Footer.vue";
import Register from "./components/Register.vue";
import test from "./components/testComp.vue";
// import { ca } from "vuetify/locale";
export default {
  name: "app",
  components: {
    test,
    Login,
    Home,
    Footer,
    Shop,
    Product,
    Cart,
    Register,
  },

  data: () => ({
    HomeClass: "v-tab-item--selected v-tab--selected text-red",
    component: "Home",
    tab: null,
    ShopSelected: false,
    componentName: null,
    componentParam: null,
    products: [],
    avatar: null,

    drawer: false,
    group: null,
    navigator: [
      {
        title: "Home",
        value: "/",
      },
      {
        title: "Shop",
        value: "/shop/all",
      },
      {
        title: "About",
        value: "/about",
      },
      {
        title: "Contact",
        value: "/contact",
      },
      {
        title: "Login",
        value: "/login",
      },
      {
        title: "Cart",
        value: "/cart",
      },
    ],
    navigatorLg: [
      {
        title: "Shop",
        value: "/shop/all",
      },
      {
        title: "About",
        value: "/about",
      },
      {
        title: "Contact",
        value: "/contact",
      },
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    backHome() {
      this.$refs.home.$el.click();
    },
    switchTab(tab) {
      if (tab == "Shop") {
        this.ShopSelected = true;
        this.component = null;
      } else {
        this.component = tab;
        this.ShopSelected = false;
      }
      this.componentParam = null;
      this.componentName = null;
    },
    loadProductTab(item, items) {
      this.component = null;
      this.componentName = "Product";
      this.componentParam = item;
      this.ShopSelected = false;
      this.products = items;
    },
    loadRegisterTab() {
      this.component = null;
      this.componentName = "Register";
      this.componentParam = null;
      this.ShopSelected = false;
    },
    loadLoginTab() {
      this.component = null;
      this.componentName = "Login";
      this.componentParam = null;
      this.ShopSelected = false;
    },
  },
  mounted() {
    this.avatar = localStorage.getItem("avatar");
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
.fas {
  cursor: pointer;
}
</style>
