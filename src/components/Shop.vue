<template>
  <v-container class="min-height-500 pa-7">
    <div class="min-height-500">
      <!-- <v-row no-gutters>
        <v-col cols="3" sm="3">Sắp xếp:</v-col>
        <v-col
          class="cursor-pointer mb-5"
          cols="3"
          sm="2"
          v-for="{ sortType, index } in sortTypes"
          :key="index"
          :item="sortType"
          >gia dam dan</v-col
        >
      </v-row> -->
      <v-row no-gutters>
        <v-col cols="12" sm="12" xs="12">
          <v-select :items="categories" item-title="title" label="Category">
            <template v-slot:item="{ props }">
              <v-list-item
                v-bind="props"
                @click="categorySelected(props.value)"
              ></v-list-item>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col
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
                <p class="text-red-darken-2 text-h6 product-name">
                  {{ item.name }}
                </p>
                <v-card-subtitle> {{ item.unitPrice }} VND</v-card-subtitle>
                <v-card-subtitle> {{ item.productStatus }}</v-card-subtitle>
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
  </v-container>
</template>

<style>
.min-height-500 {
  min-height: 50rem;
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
      products: [],
      filterFlag: false,
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
    };
  },
  // watch: {
  //   // getProductDetail
  //   currentPage() {
  //     this.getProductsData(this.currentPage);
  //   },
  // },
  methods: {
    pageChanged() {
      this.getProductsData(this.currentPage);
    },
    onProductClick(itemId) {
      this.$router.push("/product/" + itemId);
    },
    // fetch get product api
    async getProductsData(page) {
      const sortId = this.$route.query.sortType;
      const cateId = this.$route.query.categoryId;
      this.currentPage = this.$route.query.currentPage;
      var sortType = this.sortTypes[0].value;
      var categoryId = this.categories[0].value;
      if (page != null) this.currentPage = page;
      else if (this.currentPage == null) this.currentPage = 1;
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

    categorySelected(cateId) {
      // const cate = this.categories.find(
      //   (category) => category.title === cateId
      // );
      // this.$router.push(`/shop?categoryId=${cate}`);
    },
  },
  mounted() {
    this.getProductsData();
  },
};
</script>
