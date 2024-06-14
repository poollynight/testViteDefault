<template>
  <v-container class="min-height-500 pa-7">
    <div class="min-height-500">
      <v-row justify="left">
        <v-col cols="12" sm="5" lg="6">
          <span class="subheading">Phân loại</span>
          <v-chip-group selected-class="text-primary" mandatory>
            <router-link
              :to="{ path: '/shop', query: { categoryId: index } }"
              v-for="(cate, index) in categories"
              :key="index"
              class="text-decoration-none text-black"
              @click="selectedCategory = cate.title"
            >
              <v-chip :text="cate.title"></v-chip
            ></router-link>
          </v-chip-group>
        </v-col>

        <!-- sort -->
        <v-col cols="12" sm="7" lg="6">
          <span class="subheading">Sắp xếp</span>
          <v-chip-group selected-class="text-primary" mandatory>
            <router-link
              :to="{ path: '/shop', query: { sortType: index } }"
              v-for="(type, index) in sortTypes"
              :key="index"
              :ref="'sort' + index"
              class="text-decoration-none text-black"
              @click="selectedCategory = type.title"
            >
              <v-chip :text="type.title"></v-chip
            ></router-link>
          </v-chip-group>
        </v-col>
      </v-row>
      <router-view />
    </div>
  </v-container>
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
import testComp from "./testComp.vue";
export default {
  components: {
    testComp,
  },
  data() {
    return {
      selectedCategory: "All",
      products: [],
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
      showMenu: false,
      loadProductCondition: {
        sortType: "prod:name:desc",
        cate: 0,
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    // Kiểm tra nếu route hiện tại là route trước đó
    if (from.name === this.$route.name) {
      // Nếu là trang trước đó, gọi hàm xử lý
      // console.log("beforeRouteLeave");
    }
    // Tiếp tục với việc chuyển route
    next();
  },
};
</script>
