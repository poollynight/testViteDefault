<template>
  <v-app>
    <!-- Header -->
    <div class="">
      <!-- Top header -->
      <v-toolbar color="red-darken-4" height="40">
        <v-container>
          <v-row class="d-flex" align="center" justify="center">
            <v-col class="text-center">Nước hoa cho mọi tầng lớp</v-col>
          </v-row>
        </v-container>
      </v-toolbar>

      <!-- Bottom header -->
      <v-toolbar height="100" class="bg-white">
        <v-row align="center">
          <v-col
            cols="3"
            class="text-red-darken-4 h-100 d-inline-flex justify-center text-h5"
          >
            <h1>
              <p class="text-decoration-none text-weight-bold">Odour</p>
            </h1>
          </v-col>
          <v-col cols="6">
            <v-tabs
              class="d-flex justify-center"
              v-model="tab"
              align-tabs="center"
              color="red"
            >
              <v-tab @click="tabSelected('Home')"
                ><h3 class="tab">Home</h3></v-tab
              >
              <v-tab @click="tabSelected('Shop')"
                ><h3 class="tab">Shop</h3></v-tab
              >
              <v-tab @click="tabSelected('About')"
                ><h3 class="tab">About</h3></v-tab
              >
              <v-tab @click="tabSelected('Contact')"
                ><h3 class="tab">Contact</h3></v-tab
              >
            </v-tabs>
          </v-col>
          <v-col
            cols="1"
            color="success"
            class="col-3 d-flex justify-space-between"
          >
            <p></p>
            <a href=""><i class="fas fa-shopping-cart"></i></a>
            <a href=""><i class="fas fa-user"></i></a>
          </v-col>
        </v-row>
      </v-toolbar>
    </div>
    <v-main>
      <Home v-if="HomeSelected" />
      <Shop v-if="ShopSelected" @load-product="loadProduct"></Shop>
      <About v-if="AboutSelected"></About>
      <Contact v-if="ContactSelected"></Contact>
      <Product
        v-if="componentName == 'Product'"
        :item="componentParam"
      ></Product>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Product from "./components/Product.vue";
import Shop from "./components/Shop.vue";
export default {
  name: "app",
  components: {
    Shop,
    Product,
  },

  data: () => ({
    tab: null,
    HomeSelected: true,
    ShopSelected: false,
    AboutSelected: false,
    ContactSelected: false,
    componentName: null,
    componentParam: null,
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

    loadProduct(item) {
      this.componentName = "Product";
      this.componentParam = item;
      this.ShopSelected = false;
    },
  },
  mounted() {
    localStorage.setItem("tab", 'Home');
    this.switchTab();
  },
};
</script>
<style>
.tab {
  font-size: 1em;
}
</style>
