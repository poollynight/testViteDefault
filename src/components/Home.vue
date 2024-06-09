<template>
  <v-carousel
    height="75vh"
    class="carousel"
    show-arrows="hover"
    cycle
    hide-delimiters
  >
    <v-carousel-item
      v-for="(item, i) in carousel"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
  <!-- Sản phẩm moi -->
  <v-row no-gutters>
    <NewProduct></NewProduct>
  </v-row>
  <!-- Sản phẩm hot -->
  <v-row no-gutters>
    <HotTrend></HotTrend>
  </v-row>
  <!-- Danh mục các sản phẩm -->
  <v-container>
    <h2>Danh mục</h2>
    <v-row no-gutters>
      <v-col
        v-for="(cate, n) in categories"
        :key="n"
        :item="cate"
        cols="12"
        sm="4"
        class="pa-6"
        
      >
        <v-sheet
          class="pa-2"
          align="center"
          justify="center"
          max-width="320"
        >
          <v-img
            min-width="auto"
            max-height="363"
            :src="images[n]"
            class="category"
            alt=""
          ></v-img>
          <v-col cols="12" class="text-center">
            <span>{{ cate }}</span>
          </v-col>
          <v-btn
            @click="$router.push('/shop/:' + cate)"
            class="responsive-btn"
            color="red"
          >
            <p>Go Shop</p>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HotTrend from "./HomeHotTrend.vue";
import NewProduct from "./HomeNewProduct.vue";
export default {
  components: {
    HotTrend,
    NewProduct,
  },
  data() {
    return {
      categories: ["For Men", "For Ladies", "Gift Set"],
      images: [
        "https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/cate-men_lmimzr.webp",
        "https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/cate-ladies_ctuuar.webp",
        "https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/cate-gift_hjzql5.jpg",
      ],
      carousel: [
        {
          src: "https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/carousel_1_p5muwk.jpg",
        },
        {
          src: "https://res.cloudinary.com/dsyysapur/image/upload/v1717643041/ODOUR_EXE/SYSTEM/carousel_2_xb59cg.jpg",
        },
        {
          src: "https://res.cloudinary.com/dsyysapur/image/upload/v1717643041/ODOUR_EXE/SYSTEM/carousel_3_g2yfsi.jpg",
        },
        {
          src: "https://res.cloudinary.com/dsyysapur/image/upload/v1717643041/ODOUR_EXE/SYSTEM/carousel_4_ewbnny.jpg",
        },
      ],
    };
  },
};
</script>
<style>
.h0 {
  font-size: 50px;
}
.height-500 {
  max-height: 700px;
}
.category {
  min-height: 140px;
  max-height: 200px;
}
</style>
