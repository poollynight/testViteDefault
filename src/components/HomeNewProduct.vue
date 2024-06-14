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
          class="ma-4 "
        >
          <v-responsive
            class="ma-4 text-center cursor-pointer phone-loader"
            color="grey-lighten-1"
            height="400"
            width="100%"
            @click="
              onProductClick(item.id);
              toggle;
            "
          >
            <v-img
              max-height="300px"
              :src="item.medias[0].storageUrl"
              cover
            ></v-img>
            <div class="product-text">
              <p class="text-h5 product-name text-black">{{ item.name }}</p>
              <v-card-subtitle class="text-red text-h6">
                {{ item.unitPrice }} VND</v-card-subtitle
              >
              <v-card-subtitle class="text-black text-h8">
                {{ item.productStatus }}</v-card-subtitle
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
@media screen and (max-width: 471px) {
  .phone-loader {
    max-width: 17vw !important;
    max-height: 30vh;
  }
}
</style>
