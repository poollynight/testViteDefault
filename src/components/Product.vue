<template>
  <link
    href="https://fonts.googleapis.com/css?family=Material+Icons"
    rel="stylesheet"
  />
  <v-card color="grey-lighten-4">
    <v-container>
      <v-row justify="center" text-align="center">
        <v-col cols="5" align="center">
          <v-img height="400" cover src="/src/assets/cate-men.jpg"></v-img>
          <v-sheet
            class="mx-auto mt-5"
            max-width="500"
            max-height="150"
            color="grey-lighten-4"
          >
            <v-slide-group
              v-model="model"
              color="grey"
              class="pa-4"
              center-active
              show-arrows
            >
              <v-slide-group-item
                v-for="n in item.image.length"
                :key="n"
                v-slot="{ isSelected, toggle }"
              >
                <v-card
                  :color="isSelected ? 'grey-lighten-2' : 'grey-lighten-1'"
                  class="ma-4"
                  height="100"
                  width="100"
                  @click="toggle"
                >
                  <v-img
                    height="200"
                    aspect-ratio="16/9"
                    cover
                    src="/src/assets/cate-men.jpg"
                  ></v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
        <v-col cols="7" align="center">
          <v-card class="text-left pl-5">
            <div>
              <p class="ProName">{{ item.name }}</p>
              <p class="price mt-3 text-h6">{{ item.price }}</p>
            </div>
            <div>
              <p class="text-h6">Description:</p>
              <p>{{ item.description }}</p>
            </div>
            <div>
              <p class="text-h6">Nhóm hương:</p>
              <p>{{ item.category }}</p>
            </div>
            <div>
              <p class="text-h6">Tầng hương:</p>
              <p class="text-subtitle-1">
                Tầng đầu: {{ item.category }}
                <br />
                Tầng giữa: {{ item.category }}
                <br />
                Tầng cuối: {{ item.category }}
              </p>
            </div>
            <div>
              <p class="text-h6">Độ lưu hương:</p>
              <p class="text-subtitle-1">
                Trên da: {{ item.category }}
                <br />
                Trên vải: {{ item.category }}
              </p>
            </div>
            <div class="d-flex">
              <p class="text-h5 mr-4">Số lượng</p>
              <v-row>
                <v-col cols="2">
                  <v-btn
                    class="bg-red-darken-4 mr-5"
                    @click="decreaseQuantity()"
                  >
                    -
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-input disabled class="text-center quantityInput">
                    {{ quantity }}
                  </v-input>
                </v-col>
                <v-col cols="2">
                  <v-btn class="bg-red-darken-4" @click="increaseQuantity()">
                    +
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div class="d-flex flex-row">
              <v-btn class="bg-red-darken-4 mr-6 w-25">Mua ngay</v-btn>
              <v-btn class="bg-red-darken-4" @click="addToCart"
                >Thêm vào giỏ hàng</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
</style>

<script>
// import { useCookies } from "vue-cookies";
export default {
  // setup() {
  //   const { cookies } = useCookies();

  //   const setCookie = () => {
  //     cookies.set("myCookie", "myValue", 30 * 24 * 60 * 60); // Set cookie for 30 days
  //     console.log(123);
  //   };

  //   return {
  //     setCookie,
  //   };
  // },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    model: null,
    quantity: 1,
  }),
  methods: {
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      this.quantity -= 1;
      if (this.quantity < 1) this.quantity = 1;
    },

    addToCart() {
      // this.$cookie.set("keyName", keyValue, "expiring time");
      // setCookie('cookie','my cookie',30 )
      document.cookie =
        "keyName" +
        "=" +
        [
          { name: "my cookie", value: "my cookie" },
          { name: "my cookie", value: "my cookie" },
        ];
      console.log(document.cookie);
    },
  },
};
</script>
