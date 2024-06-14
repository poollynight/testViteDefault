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
            max-height="400"
            width="290"
            @click="
              onProductClick(item.id);
              toggle;
            "
          >
            <v-img
              :src="item.medias[0].storageUrl"
              cover
            ></v-img>
            <div class="product-text">
              <p class="text-h5 text-black">{{ item.name }}</p>
              <p class="text-red text-h6">
                {{ item.unitPrice }} VND</p
              >
              <p class="text-black text-h8">
                {{ item.productStatus }}</p
              >
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
    loading: true,
  }),
  methods: {
    async getHomeProducts() {
      try {
        const res = await axios.get("https://main.odour.site/product/home");
        this.newProducts = res.data.body.newProducts;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    onProductClick(itemId) {
      this.$router.push("/product/" + itemId);
    },
  },
  mounted() {
    this.getHomeProducts();
  },
};
</script>
<style>
.product-text {
  font-size: x-large;
}
@media screen and (max-width: 471px) {
  .product-text {
    font-size: small;
  }
  .product-text p:first-child {
    height: 8vh;
  }
}
</style>
