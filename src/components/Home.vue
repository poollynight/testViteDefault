<template>
  <test></test>
  <v-carousel
    height="60vh"
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
        class="pa-6 phone-sheet"
      >
        <v-responsive
          class="pa-2 bg-white"
          align="center"
          justify="center"
          height="350"
          max-width="335"
        >
          <v-img
            min-width="auto"
            max-height="363"
            :src="images[n]"
            class="category"
            alt=""
          ></v-img>
          <v-col cols="12" class="text-center pa-4">
            <span class="text-h5">{{ cate }}</span>
          </v-col>
          <v-btn
            @click="$router.push('/shop?categoryId=' + (n + 1))"
            class="responsive-btn"
            color="red"
          >
            <p>Go Shop</p>
          </v-btn>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HotTrend from "./HomeHotTrend.vue";
import NewProduct from "./HomeNewProduct.vue";
import test from "./testComp.vue";
import axios from "axios";
export default {
  components: {
    HotTrend,
    NewProduct,
    test,
  },
  data() {
    return {
      hotProducts: [],
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
  methods: {
    async getHomeProducts() {
      try {
        const res = await axios.get("https://main.odour.site/product/home", {});
        this.hotProducts = res.data.body.newProducts;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getHomeProducts();
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
@media screen and (max-width: 350px) and (min-width: 100px) {
  .phone-sheet {
    max-height: 110vw;
  }
  .carousel {
    height: 46vw !important;
  }
}
@media screen and (max-width: 399px) and (min-width: 351px) {
  .phone-sheet {
    max-height: 95vw;
  }
  .carousel {
    height: 30vh !important;
  }
}
@media screen and (max-width: 599px) and (min-width: 400px) {
  .phone-sheet {
    max-height: 95vw;
  }
  .carousel {
    height: 30vh !important;
  }
}
@media screen and (max-width: 1279px) and (min-width: 600px) {
  .phone-sheet {
    max-height: 70vw;
  }
}
</style>
