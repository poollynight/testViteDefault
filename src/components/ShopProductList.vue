<template>
  <div class="min-height-500" width="100%">
    <v-row>
      <v-col
        style="overflow-x: auto"
        v-for="item in products"
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
              <p class="text-red-darken-2 text-h7 product-name">
                {{ item.name }}
              </p>
              <v-card-subtitle class="product-name">
                {{ item.unitPrice }} VND</v-card-subtitle
              >
              <v-card-subtitle class="product-name">
                {{ item.productStatus }}</v-card-subtitle
              >
            </div>
          </v-responsive>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
  <div class="text-center">
    <v-pagination
      v-model="currentPage"
      :length="pageLength"
      :total-visible="2"
      @click="pageChanged"
    ></v-pagination>
  </div>
</template>

<style>
.min-height-500 {
  min-height: 50rem;
}
@media screen and (max-width: 812px) and (min-width: 715px) {
  .product-name {
    font-size: 0.8em !important;
  }
}
@media screen and (max-width: 714px) and (min-width: 600px) {
  .product-name {
    font-size: 0.6em !important;
  }
}
</style>

<script>
import axios from "axios";
import testComp from "./testComp.vue";
export default {
  components: {
    testComp,
  },
  data() {
    return {
      products: [1, 2, 3, 4, 5, 5],
      currentPage: 1,
      sortTypes: [
        {
          title: "Tên A-Z",
          value: "prod:name:asc",
        },
        {
          title: "Tên Z-A",
          value: "prod:name:desc",
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
    };
  },
  watch: {
    $route(to, from) {
      // Kiểm tra xem route có thay đổi không

      if (
        to.path === "/shop" &&
        to.path === from.path &&
        to.query !== from.query &&
        to.query.sortType === undefined
      ) {
        localStorage.setItem("cate", this.$route.query.categoryId);
        this.getProductsData();
      } else if (to.query.sortType !== undefined) {
        this.getProductsData();
      } else if (from.path === "/home") {
        localStorage.setItem("cate", this.$route.query.categoryId);
      }
      if (from.path === "/home") {
        localStorage.setItem("cate", this.$route.query.categoryId);
      }
    },
  },
  methods: {
    pageChanged() {
      this.$router.push(
        "/shop?currentPage=" +
          this.currentPage +
          "&categoryId=" +
          localStorage.getItem("cate", this.$route.query.categoryId)
      );
    },
    onProductClick(itemId) {
      this.$router.push("/product/" + itemId);
    },
    // fetch get product api
    async getProductsData(page) {
      this.loading = true;
      this.currentPage = parseInt(this.$route.query.currentPage);
      var sortType = this.sortTypes[0].value;
      var categoryId = this.categories[0].value;
      const sortId = this.$route.query.sortType;
      const cateIndex = localStorage.getItem("cate");
      if (page != null) this.currentPage = parseInt(page);
      else if (this.$route.query.currentPage == null) this.currentPage = 1;
      if (sortId != null) sortType = this.sortTypes[sortId].value;
      else sortType = this.sortTypes[0].value;
      if (cateIndex === "undefined") categoryId = this.categories[0].value;
      else categoryId = this.categories[cateIndex].value;
      try {
        const response = await axios.get(
          `https://main.odour.site/product?currentPage=${this.currentPage}&sortType=${sortType}&categoryId=${categoryId}`
        );
        this.products = response.data.body.products; // Assuming the response is an array of items
        this.pageLength = response.data.body.numberOfPage;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    // if (localStorage.getItem("cate") === null) localStorage.setItem("cate", 0);
    localStorage.setItem("cate", this.$route.query.categoryId);
    this.getProductsData();
  },
};
</script>
