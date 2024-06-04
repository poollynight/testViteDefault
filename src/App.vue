<template>
  <v-app>
    <!-- Header -->
    <div class="bg-red-darken-4 app-header">
      <!-- Top header -->
      <v-row class="" height="30">
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
        <v-row align="center">
          <v-col
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
              <v-tab @click="tabSelected('Home')"
                ><p class="tab">Home</p></v-tab
              >
              <v-tab @click="tabSelected('Shop')"
                ><p class="tab">Shop</p></v-tab
              >
              <v-tab @click="tabSelected('About')"
                ><p class="tab">About</p></v-tab
              >
              <v-tab @click="tabSelected('Contact')"
                ><p class="tab">Contact</p></v-tab
              >
            </v-tabs>
          </v-col>
          <v-col
            cols="1"
            color="success"
            class="col-3 d-flex justify-space-between"
          >
            <p></p>
            <a href=""><i class="fas fa-shopping-cart">1</i></a>
            <a href=""><i class="fas fa-user">1</i></a>
          </v-col>
        </v-row>
      </v-toolbar>
    </div>
    <v-main class="bg-blue-grey-lighten-5">
      <!-- <Cart></Cart> -->
      <Home v-if="HomeSelected" />
      <Shop v-if="ShopSelected" @load-product="loadProduct"></Shop>
      <!-- <About v-if="AboutSelected"></About>
      <Contact v-if="ContactSelected"></Contact> -->
      <Product
        v-if="componentName == 'Product'"
        :item="componentParam"
        :products="products"
      ></Product>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Cart from "./components/Cart.vue";
import Product from "./components/Product.vue";
import Shop from "./components/Shop.vue";
import Home from "./components/Home.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "app",
  components: {
    Home,
    Footer,
    Shop,
    Product,
    Cart,
  },

  data: () => ({
    tab: null,
    HomeSelected: true,
    ShopSelected: false,
    AboutSelected: false,
    ContactSelected: false,
    componentName: null,
    componentParam: null,
    products: [],
  }),
  methods: {
    tabSelected(tab) {
      localStorage.setItem("tab", tab);
      this.switchTab();
    },
    switchTab() {
      var tab = localStorage.getItem("tab");
      if (tab == "Home") {
        this.HomeSelected = true;
        this.ShopSelected = false;
        this.AboutSelected = false;
        this.ContactSelected = false;
        this.componentName = null;
      } else if (tab == "Shop") {
        this.ShopSelected = true;
        this.HomeSelected = false;
        this.AboutSelected = false;
        this.ContactSelected = false;
        this.componentName = null;
      } else if (tab == "About") {
        this.AboutSelected = true;
        this.HomeSelected = false;
        this.ShopSelected = false;
        this.ContactSelected = false;
        this.componentName = null;
      } else if (tab == "Contact") {
        this.ContactSelected = true;
        this.HomeSelected = false;
        this.ShopSelected = false;
        this.AboutSelected = false;
        this.componentName = null;
      }
    },

    loadProduct(item, items) {
      this.componentName = "Product";
      this.componentParam = item;
      this.ShopSelected = false;
      this.products = items;
      console.log(this.products);
    },
  },
  mounted() {
    this.tabSelected("Home");
    this.switchTab();
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
