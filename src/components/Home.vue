<script setup lang="ts"></script>

<template>
  <v-carousel height="auto" class="carousel">
    <v-carousel-item
      v-for="(item, i) in carousel"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>

  <v-container >
    <h2>Danh mục</h2>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="12" sm="4" class="float-left">
        <v-sheet class="ma-2 pa-2" align="center" justify="center" >
          <v-img
            min-width="163"
            max-height="163"
            :src="images[n]"
            class="category"
            contain
          ></v-img>
          <v-col cols="12" class="text-center">
            <span>{{ categories[n] }}</span>
          </v-col>
          <v-btn class="responsive-btn" color="red">
            <p>Go Shop</p>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: ["", "For Men", "For Ladies", "Gift Set"],
      images: [
        "",
        "/src/assets/cate-men.jpg",
        "/src/assets/cate-ladies.jpg",
        "/src/assets/cate-gift.jpg",
      ],
      carousel: [
        { src: "/src/assets/carousel_1.jpg" },
        { src: "/src/assets/carousel_2.jpg" },
        { src: "/src/assets/carousel_3.jpg" },
        { src: "/src/assets/carousel_4.jpg" },
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
