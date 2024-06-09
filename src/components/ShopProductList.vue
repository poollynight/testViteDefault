<template>
  <v-row>
    <v-col
      v-for="item in this.products"
      :key="item.Id"
      :item="item"
      cols="12"
      sm="4"
    >
      <v-skeleton-loader :loading="loading" type="card">
        <v-responsive
          class="ma-2 pa-2 cursor-pointer"
          align="center"
          justify="center"
          @click="onProductClick(item.id)"
        >
          <v-img
            max-height="400px"
            :src="item.medias[0].storageUrl"
            cover
          ></v-img>
          <div class="product-text">
            <p class="text-red-darken-2 text-h6 product-name">
              {{ item.name }}
            </p>
            <v-card-subtitle> {{ item.unitPrice }} VND</v-card-subtitle>
            <v-card-subtitle> {{ item.productStatus }}</v-card-subtitle>
          </div>
        </v-responsive>
      </v-skeleton-loader>
    </v-col>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="pageLength"
        :total-visible="2"
        @click="getProductsData(currentPage)"
      ></v-pagination>
    </div>
  </v-row>
</template>
<style>
@media screen and (max-width: 780px) and (min-width: 715px) {
  .product-name {
    font-size: 1em !important;
  }
}
@media screen and (max-width: 714px) and (min-width: 600px) {
  .product-name {
    font-size: 0.7em !important;
  }
}
</style>
<script>
import axios from "axios";
export default {
  data: {
    return: {
      products: [1, 2, 3, 4, 5, 6],
      currentPage: 1,
      itemsPerPage: 9,
      sortTypes: [
        {
          title: "Tên A-Z",
          value: "prod:name:desc",
        },
        {
          title: "Tên Z-A",
          value: "prod:name:asc",
        },
        { title: "Giá giảm dần", value: "prod:price:desc" },
        { title: "Giá tăng dần", value: "prod:price:asc" },
      ],
      categories: [
        {
          title: "All",
          value: "7b513726-d8a9-4849-b797-4e31a34c378f",
        },
        {
          title: "For Men",
          value: "42e48d19-b2f6-4112-b14f-0b0131b339d5",
        },
        {
          title: "For Ladies",
          value: "f081ab44-7eb4-4ae9-9a35-5dfaf6e82c1c",
        },
      ],
      pageLength: 0,
      loading: true,
      showMenu: false,
    },
  },
  methods: {
    onProductClick(itemId) {
      this.$router.push("/product/" + itemId);
    },
    // fetch get product api
    async getProductsData() {
      const sortId = this.$route.query.sortType;
      const cateId = this.$route.query.categoryId;
      this.currentPage = this.$route.query.currentPage;
      var sortType = this.sortTypes[0].value;
      var categoryId = this.categories[0].value;
      console.log(sortType != null);
      if (this.currentPage == null) this.currentPage = 1;
      if (sortId != null) sortType = this.sortTypes[sortId].value;
      if (cateId != null) categoryId = this.categories[cateId].value;
      try {
        const response = await axios.get(
          `https://main.odour.site/product?currentPage=${this.currentPage}&sortType=${sortType}&categoryId=${categoryId}`
        );
        this.products = response.data.body.products; // Assuming the response is an array of items
        this.pageLength = response.data.body.numberOfPage;
        this.loading = false;
        console.log(this.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
