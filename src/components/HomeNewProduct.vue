<template>
  <v-container>
    <h2>Sản phẩm mới</h2>
    <v-slide-group
      v-model="model"
      class="pt-4"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item v-for="items in 15" :key="items" v-slot="{ toggle }">
        <!-- <v-responsive
    class="ma-2 pa-2 cursor-pointer"
    align="center"
    justify="center"
    @click="onProductClick(item.id)"
    >
    <v-img
    max-height="400px"
    src="https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/cate-men_lmimzr.webp"
    cover
    ></v-img>
    <div class="product-text">
      <p class="text-red-darken-2 text-h7 product-name">123</p>
      <v-card-subtitle> 123 VND</v-card-subtitle>
      </div>
      </v-responsive> -->
        <v-skeleton-loader
          :loading="loading"
          type="card"
          width="300"
          class="ma-4"
        >
          <router-link to="/shop/all" class="text-decoration-none text-center">
            <v-responsive
              :class="['ma-4']"
              color="grey-lighten-1"
              height="300"
              width="290"
              @click="toggle"
            >
              <v-img
                max-height="400px"
                src="https://res.cloudinary.com/dsyysapur/image/upload/v1717643040/ODOUR_EXE/SYSTEM/cate-men_lmimzr.webp"
                cover
              ></v-img>
              <div class="product-text">
                <p class="text-h5 product-name text-black">123</p>
                <v-card-subtitle class="text-red text-h6">
                  123 VND</v-card-subtitle
                >
              </div>
            </v-responsive>
          </router-link>
        </v-skeleton-loader>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>
<script>
export default {
  name: "NewProduct",
  data: () => ({
    model: null,
    loading: false,
  }),
};
</script>
