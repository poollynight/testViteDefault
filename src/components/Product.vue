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
        :lazy="true"
        @click="showImage = false"
        class="cursor-zoom-in"
      ></v-img>
    </v-dialog>
  </div>
  <v-container>
    <v-skeleton-loader :loading="loading" type="">
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
                    :src="product.medias[0].storageUrl"
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
            </div>
            <v-sheet height="4rem" class="bg-grey-lighten-4 d-flex">
              <p class="ProName mt-3 pl-5 text-red-darken-2">
                {{ product.unitPrice }} VND
              </p>
            </v-sheet>
            <div>
              <p class="text-h6">Nhóm hương:</p>
              <p>{{ nhomHuong }}</p>
            </div>
            <div>
              <p class="text-h6">Tầng hương:</p>
              <p class="text-subtitle-1">
                Tầng đầu: {{ tangHuongDau }}
                <br />
                Tầng giữa: {{ tangHuongGiua }}
                <br />
                Tầng cuối: {{ tangHuongCuoi }}
              </p>
            </div>
            <div>
              <p class="text-h6">Độ lưu hương:</p>
              <p class="text-subtitle-1">
                Trên da: 14 - 18 giờ
                <br />
                Trên vải: 2 - 3 ngày
              </p>
            </div>
            <div>
              <p class="text-h5">Số lượng</p>
              <v-row>
                <v-col class="d-flex" cols="12">
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
                  <p>{{ product.quantityInStock }} sản phẩm có sẵn</p>
                </v-col>
              </v-row>
            </div>
            <div class="d-flex flex-row pb-4">
              <v-btn class="bg-red-darken-4 mr-6 w-25">Mua ngay</v-btn>
              <v-btn class="bg-red-darken-4" @click="addToCart"
                >Thêm vào giỏ hàng</v-btn
              >
            </div>
          </v-responsive>
        </v-col>
      </v-row>
    </v-skeleton-loader>
  </v-container>

  <!-- Other products -->
  <!-- <v-container class="mx-auto" max-width="1000">
    <v-sheet class="pa-2">
      <p class="text-h5">CÓ THỂ BẠN CŨNG THÍCH</p>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="pro in otherProducts" :key="pro.id">
          123
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container> -->
</template>

<style>
.text-left div {
  margin-bottom: 1rem;
}
.ProName {
  font-size: xx-large;
}
.quantityInput {
  height: 2em;
}
.centered-text-field input {
  text-align: center;
}
.no-background-text-field .v-input__slot {
  background-color: transparent !important;
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
    model: null,
    billNumber: 1,
  }),

  methods: {
    productImageSrc(id) {
      return `/src/assets/${id}.jpg`;
    },
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      this.quantity -= 1;
      if (this.quantity < 1) this.quantity = 1;
    },

    addToCart() {
      var email = this.$cookies.get("e");
      const bill = {
        email: email,
        product: this.product.id,
        quantity: this.quantity,
      };
      const billNumber = this.$cookies.keys().filter((key) => key.startsWith("cart")).length +1;
      const jsonBill = JSON.stringify(bill);
      this.$cookies.set("cart" + email + billNumber, jsonBill, "30d", "/");
    },
    async getProductDetail() {
      try {
        const itemId = this.$route.params.id;
        const response = await axios.get(
          `https://main.odour.site/product/${itemId}`
        );
        this.product = response.data.body.product;
        const description = JSON.parse(this.product.description);
        this.nhomHuong = description.NHOM_HUONG[0];
        this.tangHuongDau = description.TANG_HUONG.HUONG_DAU;
        this.tangHuongGiua = description.TANG_HUONG.HUONG_GIUA;
        this.tangHuongCuoi = description.TANG_HUONG.HUONG_CUOI;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.getProductDetail();
    console.log();
  },
};
</script>
