<template>
  <div>
    <v-dialog
      v-model="zoomImage"
      max-width="800"
      justify="center"
      align="center"
    >
      <v-img
        max-width="800"
        height="auto"
        cover
        :src="product.medias[0].storageUrl"
        @click="showImage = false"
        class="cursor-zoom-in"
      ></v-img>
    </v-dialog>
  </div>
  <v-container>
    <v-skeleton-loader
      :loading="loading"
      type="card-avatar, article"
      height="800"
    >
      <v-row no-gutters>
        <v-col cols="12" sm="5" align="center">
          <v-responsive
            class="bg-white pa-5"
            max-width="500"
            color="grey-lighten-4"
          >
            <v-img
              style="cursor: pointer"
              height="auto"
              cover
              :src="product.medias[0].storageUrl"
              @click="zoomImage = !zoomImage"
            ></v-img>
            <v-slide-group
              v-model="model"
              class="mt-10"
              center-active
              show-arrows
            >
              <v-slide-group-item v-for="n in 3" :key="n" v-slot="{ toggle }">
                <v-card class="ma-4" height="100" width="100" @click="toggle">
                  <v-img
                    height="200"
                    aspect-ratio="16/9"
                    cover
                    v-bind:src="product.medias[0].storageUrl"
                  ></v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
            <p class="text-subtitle-1 text-red-darken-2 mt-4">
              Một trong những sản phẩm bán chạy
            </p>
          </v-responsive>
        </v-col>

        <v-col cols="12" sm="7" align="center">
          <v-responsive class="text-left pa-8">
            <div>
              <p class="ProName">{{ product.name }}</p>
              <p>Dành cho: {{ product.category.name }}</p>
            </div>
            <v-sheet
              height="4rem"
              width="100%"
              class="bg-grey-lighten-4 d-flex price"
            >
              <p class="ProName mt-3 pl-5 text-red-darken-2">
                {{ product.unitPrice }} VND
              </p>
            </v-sheet>
            <div>
              <p class="text-h6">Nhóm hương:</p>
              <p>{{ nhomHuong }}</p>
            </div>
            <v-responsive width="75vw">
              <p class="text-h6">Tầng hương:</p>
              <p width="auto">
                Tầng đầu: {{ tangHuongDau }}
                <br />
                Tầng giữa: {{ tangHuongGiua }}
                <br />
                Tầng cuối: {{ tangHuongCuoi }}
              </p>
            </v-responsive>
            <div>
              <p class="text-h6">Độ lưu hương:</p>
              <p>
                Trên da: 14 - 18 giờ
                <br />
                Trên vải: 2 - 3 ngày
              </p>
            </div>
            <div>
              <p class="text-h5 mb-7">Số lượng</p>
              <v-row>
                <v-col class="d-flex" cols="12" sm="12">
                  <v-btn
                    class="bg-red-darken-4 mr-5"
                    @click="decreaseQuantity()"
                  >
                    -
                  </v-btn>
                  <p class="text-h6 mr-4">{{ quantity }}</p>
                  <v-btn
                    class="bg-red-darken-4 mr-5"
                    @click="increaseQuantity()"
                  >
                    +
                  </v-btn>
                  <v-col cols="12" sm="12"
                    ><p>{{ product.quantityInStock }} sản phẩm có sẵn</p></v-col
                  >
                </v-col>
              </v-row>
            </div>
            <v-row class="d-flex flex-row pb-4">
              <v-col cols="12" sm="5">
                <v-btn class="bg-red-darken-4 mr-6 w-25">Mua ngay</v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn class="bg-red-darken-4" @click="addToCart"
                  >Thêm vào giỏ hàng</v-btn
                >
              </v-col>
            </v-row>
          </v-responsive>
        </v-col>
      </v-row>
    </v-skeleton-loader>
  </v-container>

  <v-container>
    <h2>Sản phẩm liên quan</h2>
    <v-slide-group
      v-model="model"
      class="pt-4"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="item in relatedProducts"
        :key="item.id"
        :item="item"
      >
        <v-skeleton-loader
          :loading="relatedLoading"
          type="card"
          width="300"
          class="ma-4"
        >
          <v-responsive
            class="ma-4 text-center"
            color="grey-lighten-1"
            height="350"
            width="290"
            @click="
              onProductClick(item.id);
              toggle;
            "
          >
            <v-img
              max-height="250px"
              :src="item.medias[0].storageUrl"
              cover
            ></v-img>
            <div class="product-text">
              <p class="text-h6 text-black">{{ item.name }}</p>
              <v-card-subtitle class="text-red text-h6">
                {{ item.unitPrice }} VND</v-card-subtitle
              >
              <v-card-subtitle class="text-black text-h8">
                {{ item.productStatus }}</v-card-subtitle
              >
            </div>
          </v-responsive>
        </v-skeleton-loader>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<style>
.text-left div {
  margin-bottom: 1rem;
}
.ProName {
  font-size: x-large;
}
@media screen and (max-width: 400px) {
  .price {
    width: 75vw;
  }
}
</style>

<script>
import axios from "axios";
export default {
  data: () => ({
    zoomImage: false,
    nhomHuong: "",
    tangHuongDau: "",
    tangHuongGiua: "",
    tangHuongCuoi: "",
    otherProducts: [],
    quantity: 1,
    product: null,
    loading: true,
    relatedLoading: true,
    model: null,
    billNumber: 1,
    relatedProducts: [1, 2, 3],
  }),

  methods: {
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      this.quantity -= 1;
      if (this.quantity < 1) this.quantity = 1;
    },

    async addToCart() {
      const bill = {
        product: this.product.id,
        quantity: this.quantity,
      };
      if (this.$cookies.get("ato") == null) {
        try {
          const response = await axios.post(
            "https://main.odour.site/guest/cart/add",
            {
              productId: this.product.id,
              quantity: this.quantity,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            "https://main.odour.site/user/cart/add",
            {
              productId: this.product.id,
              quantity: this.quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("ato")}`,
              },
            }
          );
          console.log("Success" + response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getProductDetail() {
      this.loading = true;
      var itemId = this.$route.params.id;
      try {
        const response = await axios.get(
          `https://main.odour.site/product/${itemId}`
        );
        this.product = response.data.body.product;
        this.getRelatedProducts();
        const description = JSON.parse(this.product.description);
        this.nhomHuong = description.NHOM_HUONG[0];
        this.tangHuongDau = description.TANG_HUONG.HUONG_DAU;
        this.tangHuongGiua = description.TANG_HUONG.HUONG_GIUA;
        this.tangHuongCuoi = description.TANG_HUONG.HUONG_CUOI;
        setTimeout(() => (this.loading = false), 250);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getRelatedProducts() {
      this.relatedLoading = true;
      try {
        var res = await axios.get(
          "https://main.odour.site/product/related/" + this.product.category.id
        );
        this.relatedProducts = res.data.body.products;
        this.relatedLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    onProductClick(itemId) {
      this.$router.push("/product/" + itemId);
      this.getProductDetail();
    },
  },
  watch: {
    $route(to, from) {
      // Kiểm tra xem route có thay đổi không
      if (to.params !== from.params) this.getProductDetail();
    },
  },
  mounted() {
    this.getProductDetail();
  },
};
</script>
