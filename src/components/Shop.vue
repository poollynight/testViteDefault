<template>
  <v-container>
    <test-comp></test-comp>
    <!-- <v-autocomplete
      v-model="searchValue"
      @keydown.enter="searchProducts"
      @click:append="searchProducts"
      class="w-25 h-25 searchBox"
      label="Search"
      :items="searchArray"
      variant="outlined"
    ></v-autocomplete> -->
    <v-row no-gutters>
      <!-- <v-col cols="1" sm="1" class="">
        <v-row no-gutters>
          <v-col cols="12" sm="12"
            ><p @click="filterItems('All')" class="pa-2 hover-link">
              All
            </p></v-col
          >
          <v-col cols="12" sm="12"
            ><p @click="filterItems('Men')" class="pa-2 hover-link">
              For Men
            </p></v-col
          >
          <v-col cols="12" sm="12"
            ><p @click="filterItems('Ladies')" class="pa-2 hover-link">
              For Ladies
            </p></v-col
          >
        </v-row>
      </v-col> -->
      <v-col>
        <v-row no-gutters>
          <v-col
            v-for="item in this.pagedProducts"
            :key="item.Id"
            :item="item"
            cols="12"
            sm="4"
          >
            <v-card class="ma-2 pa-2" align="center" justify="center">
              <v-img
                max-height="400px"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                cover
              ></v-img>
              <v-card-title> {{ item.name }} </v-card-title>
              <v-card-subtitle> {{ item.unitPrice }} VND</v-card-subtitle>
              <v-card-actions>
                <v-btn
                  color="orange-lighten-2"
                  text="Explore"
                  @click="onProductClick(item)"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-sheet class="mx-auto mt-5" max-width="300">
      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="n in 4"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'primary' : undefined"
            class="ma-2"
            rounded
            @click="getProductsData(n), toggle()"
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
</style>

<script>
import testComp from "./testComp.vue";
export default {
  components: {
    testComp,
  },
  data() {
    return {
      items: [],
      filteredItems: [],
      currentPage: 1,
      itemsPerPage: 9,
      categories: ["All", "Men", "Ladies"],
      pageLength: 0,
      searchValue: "",
      searchArray: [],
    };
  },
  computed: {
    pagedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
  },
  methods: {
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
    filterItems(cate = "All") {
      if (cate == "All") this.filteredItems = this.items;
      else
        this.filteredItems = this.items.filter(
          (item) => item.Category === cate
        );
      this.pages();
    },
    pages() {
      this.pageLength = Math.ceil(36 / this.itemsPerPage);
    },
    changePage(page) {
      this.getProductsData(page);
      console.log(page);
      this.currentPage = page;
    },

    fakeProductData() {
      for (let i = 1; i <= 36; i++) {
        const record = {
          Id: `ID${i}`,
          Name: `Product ${i}`,
          UnitPrice: 200000, // Random price between 1 and 100
          Description: `Description of Product ${i}`,
          QuantityInStock: Math.floor(Math.random() * (100 - 1) + 1), // Random quantity between 1 and 100
          Category: this.categories[(i % 2) + 1], // Assign categories cyclically
        };
        this.items.push(record);
        this.searchArray.push(record.Name);
      }
    },

    // fetch get product api
    async getProductsData(page) {
      console.log(page);
      try {
        const response = await fetch(
          "https://main.odour.site/product?currentPage=" + page
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.items = data.body.products; // Assuming the response is an array of items
        this.filteredItems = this.items;
        // this.searchArray.push(record.Name);
        console.log(this.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.getProductsData(1);
    // this.fakeProductData();
    this.filterItems();
    this.pages();
  },
};
</script>
