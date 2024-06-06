<template>
  <v-container class="min-height-500 pa-7">
    <v-row no-gutters class="min-height-500">
      <v-col cols="3" sm="2" xs="12" class="">
        <v-row no-gutters no-wrap>
          <v-col cols="12" sm="6" xs="3"
            ><p @click="getProductsData(1)" class="pa-2 hover-link">
              All
            </p></v-col
          >
          <v-col cols="12" sm="12" xs="3"
            ><p
              @click="getProductsData(1, categories[0])"
              class="pa-2 hover-link"
            >
              For Men
            </p></v-col
          >
          <v-col cols="12" sm="12" xs="3"
            ><p
              @click="getProductsData(2, categories[1])"
              class="pa-2 hover-link"
            >
              For Ladies
            </p></v-col
          >
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col
            v-for="item in this.items"
            :key="item.Id"
            :item="item"
            cols="12"
            sm="4"
          >
            <v-lazy>
              <v-card
                class="ma-2 pa-2"
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
              </v-card>
            </v-lazy>
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
      items: [],
      filterFlag: false,
      currentPage: 1,
      itemsPerPage: 9,
      categories: [
        "42e48d19-b2f6-4112-b14f-0b0131b339d5",
        "f081ab44-7eb4-4ae9-9a35-5dfaf6e82c1c",
      ],
      pageLength: 0,
      searchValue: "",
      searchArray: [],
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

    // fetch get product api
    async getProductsData(page, categoryId) {
      try {
        const response = await axios.get(
          `https://main.odour.site/product?currentPage=${page}`
        );
        this.items = response.data.body.products; // Assuming the response is an array of items
        if (categoryId != null) {
          this.items.splice(
            0,
            this.items.length,
            ...this.items.filter((item) => categoryId == item.category.id)
          );
          this.filterFlag = true;
        }
        this.pageLength = response.data.body.numberOfPage;
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
