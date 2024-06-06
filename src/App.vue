<template>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    rel="stylesheet"
  />
  <v-app>
    <v-card>
      <!-- Header -->
      <div class="bg-red-darken-4 app-header" v-if="$vuetify.display.mdAndUp">
        <!-- Top header -->
        <v-row class="" height="30">
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
              <p class="text-decoration-none font-weight-bold brand-name">
                ODOUR
              </p>
            </v-col>
            <v-col cols="6">
              <v-tabs
                class="d-flex justify-center"
                v-model="tab"
                align-tabs="center"
                color="red"
              >
                <v-tab ref="home" @click="switchTab('Home')"
                  ><p class="tab">Home</p></v-tab
                >
                <v-tab @click="loadShopTab()"><p class="tab">Shop</p></v-tab>
                <v-tab @click="switchTab('About')"
                  ><p class="tab">About</p></v-tab
                >
                <v-tab><p class="tab">Contact</p></v-tab>
              </v-tabs>
            </v-col>
            <v-col
              cols="1"
              color="success"
              class="col-3 d-flex justify-space-between"
            >
              <p></p>
              <v-btn @click="switchTab('Cart')"
                ><i class="fas fa-shopping-cart"></i
              ></v-btn>
              <v-btn @click="switchTab('Login')"
                ><i class="fas fa-user"></i
              ></v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
      </div>
      <!-- show on small devices -->
      <div v-if="$vuetify.display.smAndDown">
        <v-app-bar color="red-darken-4" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"
            ><i class="fa-solid fa-bars"></i
          ></v-app-bar-nav-icon>

          <v-toolbar-title>Odour</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list>
            <v-list-item
              v-for="item in navigator"
              :key="item.title"
              @click="switchTab(item.value)"
            >
              {{ item.title }}
            </v-list-item></v-list
          >
        </v-navigation-drawer>
      </div>
      <v-main class="bg-blue-grey-lighten-5" min-height="100vh">
        <Shop v-if="ShopSelected" @load-product="loadProductTab"></Shop>
        <Product
          v-if="componentName == 'Product'"
          :item="componentParam"
          :products="products"
        ></Product>
        <!-- <Register/> -->
        <component :is="component" />
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
import LoginRegisterBg from "./components/LoginRegisterBg.vue";
import Register from "./components/Register.vue";
export default {
  name: "app",
  components: {
    Login,
    Home,
    Footer,
    Shop,
    Product,
    Cart,
    LoginRegisterBg,
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

    drawer: false,
    group: null,
    navigator: [
      {
        title: "Home",
        value: "Home",
      },
      {
        title: "Shop",
        value: "Shop",
      },
      {
        title: "About",
        value: "About",
      },
      {
        title: "Contact",
        value: "Contact",
      },
      {
        title: "Login",
        value: "Login",
      },
      {
        title: "Cart",
        value: "Cart",
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
      this.component = tab;
      this.ShopSelected = false;
      this.componentName = null;
    },
    loadShopTab() {
      this.ShopSelected = true;
      this.component = null;
    },
    loadProductTab(item, items) {
      this.component = null;
      this.componentName = "Product";
      this.componentParam = item;
      this.ShopSelected = false;
      this.products = items;
    },
  },
  mounted() {},
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
