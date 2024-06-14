<template>
  <v-container>
    <h2>Sản phẩm mới</h2>
    <v-slide-group
      v-model="model"
      class="pt-4"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="(item, index) in newProducts"
        :key="index"
        :item="item"
      >
        <v-skeleton-loader
          :loading="loading"
          type="card"
          width="300"
          class="ma-4"
        >
          <v-responsive
            class="ma-4 text-center cursor-pointer phone-loader"
            color="grey-lighten-1"
            max-height="550"
            width="20vw"
            @click="
              onProductClick(item.id);
              toggle;
            "
          >
            <v-img
              width="100%"
              src="https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/cate-men_lmimzr.webp"
              cover
            ></v-img>
            <div class="home-product-text">
              <p class="text-black">{{ 123123123123123 }}</p>
              <p class="text-red">{{ 123123 }} VND</p>
              <p class="text-black">
                {{ 123123123 }}
              </p>
            </div>
          </v-responsive>
        </v-skeleton-loader>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "HotTrend",
  data: () => ({
    newProducts: [1, 1, 1, 1],
    model: null,
    loading: false,
  }),
  methods: {
    // async getHomeProducts() {
    //   try {
    //     const res = await axios.get("https://main.odour.site/product/home");
    //     this.newProducts = res.data.body.newProducts;
    //     this.loading = false;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    onProductClick(itemId) {
      this.$router.push("/product/" + itemId);
    },
  },
  mounted() {
    // this.getHomeProducts();
  },
};
</script>
<style>
.home-product-text {
  font-size: x-large;
}
@media screen and (max-width: 425px) {
  .home-product-text {
    font-size: small;
  }
  .home-product-text p:first-child {
    height: 40px !important;
  }
  .phone-loader {
    width: 45vw !important;
    max-height: 70vw;
  }
}
@media screen and (max-width: 599px) and (min-width: 426px) {
  .home-product-text {
    font-size: small;
  }
  .home-product-text p:first-child {
    height: 40px !important;
  }
  .phone-loader {
    width: 35vw !important;
    max-height: 70vw;
  }
}
@media screen and (max-width: 1192px) {
  .home-product-text {
    font-size: medium;
  }
}

</style>
