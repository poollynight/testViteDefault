<template>
  <v-container class="min-height-500 pa-7">
    <v-row no-gutters class="min-height-500">
      <v-col cols="3" sm="1" class="">
        <v-row no-gutters no-wrap>
          <v-col
            cols="12"
            sm="12"
            xs="3"
            v-for="(cate, n) in categories"
            :key="n"
            :item="cate"
            ><p @click="getProductsData(n, cate.value)" class="pa-2 hover-link">
              {{ cate.title }}
            </p></v-col
          >
        </v-row>
      </v-col>
      <!-- show on small devices -->
      <!-- <v-btn color="primary" dark @click="showCategoryMenu"> Dropdown </v-btn>
      <v-sheet class="text-center">
        <v-list v-show="showMenu">
          <v-list-item
            v-for="(item, index) in categories"
            :key="index"
            :item="item"
          >
            <v-list-item-title @click="getProductsData(index, item.value)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet> -->
      <!-- end -->
      <v-col sm="11">
        <v-row>
          <v-col
            v-for="item in this.items"
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
                @click="onProductClick(item)"
              >
                <v-img
                  max-height="400px"
                  :src="item.medias[0].storageUrl"
                  cover
                ></v-img>
                <v-card-title class="text-red-darken-2">
                  {{ item.name }}
                </v-card-title>
                <v-card-subtitle> {{ item.unitPrice }} VND</v-card-subtitle>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-sheet
      class="mx-auto mt-5 bg-blue-grey-lighten-5"
      max-width="240"
      height="auto"
      justify="center"
    >
      <v-slide-group>
        <v-slide-group-item
          v-for="n in pageLength"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'primary' : undefined"
            class="ma-2"
            rounded
            @click="
              getProductsData(n);
              toggle;
            "
          >
            {{ n }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<style>
.hover-link:hover {
  cursor: pointer;
  color: red;
}
.fixed-col {
  position: fixed;
  z-index: 1000;
}
.searchBox {
  justify-content: end;
}
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
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      filterFlag: false,
      currentPage: 1,
      itemsPerPage: 9,
      categories: [
        {
          title: "All",
          value: "",
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
  methods: {
    productImageSrc(id) {
      return `/src/assets/${id}.jpg`;
    },
    searchProducts() {
      if (this.searchValue == "") {
        this.filteredItems = this.items;
        this.pages();
        return;
      }
      this.filteredItems = this.items.filter((item) =>
        item.Name.includes(this.searchValue)
      );
      this.pages();
    },
    onProductClick(item) {
      this.$emit("load-product", item, this.items);
    },

    pages() {
      this.pageLength = Math.ceil(36 / this.itemsPerPage);
    },
    changePage(page) {
      this.getProductsData(page);
      this.currentPage = page;
    },
    showCategoryMenu() {
      this.showMenu = !this.showMenu;
    },
    // fetch get product api
    async getProductsData(page, categoryId = "") {
      try {
        const response = await axios.get(
          `https://main.odour.site/product?currentPage=${page}`
        );
        this.items = response.data.body.products; // Assuming the response is an array of items
        console.log(this.items);
        if (categoryId != '') {
          this.items.splice(
            0,
            this.items.length,
            ...this.items.filter((item) => categoryId == item.category.id)
          );
          this.filterFlag = true;
        }
        this.pageLength = response.data.body.numberOfPage;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.getProductsData(1);
    this.pages();
  },
};
</script>
