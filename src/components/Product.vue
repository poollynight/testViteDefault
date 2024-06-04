<template>
  <link
    href="https://fonts.googleapis.com/css?family=Material+Icons"
    rel="stylesheet"
  />

  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="5" align="center">
        <v-sheet
          class="mx-auto mt-5 bg-white"
          max-width="500"
          height="100%"
          color="grey-lighten-4"
        >
          <v-img height="auto" cover src="/src/assets/cate-men.jpg"></v-img>
          <v-slide-group
            v-model="model"
            class="pa-4"
            center-active
            show-arrows
          >
            <v-slide-group-item
              v-for="n in 3"
              :key="n"
              v-slot="{ toggle }"
            >
              <v-card
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
      <v-col cols="12" sm="7" align="center" height="100%">
        <v-sheet class="text-left pl-5">
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
              Trên da: 6 - 8h
              <br />
              Trên vải: 12 - 24h
            </p>
          </div>
          <div>
            <p class="text-h5 mr-4">Số lượng</p>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="quantity"
                  class="centered-text-field no-background-text-field"
                >
                  <template v-slot:append>
                    <v-btn class="bg-red-darken-4" @click="increaseQuantity()">
                      +
                    </v-btn>
                  </template>
                  <template v-slot:prepend>
                    <v-btn
                      class="bg-red-darken-4 mr-5"
                      @click="decreaseQuantity()"
                    >
                      -
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </div>
          <div class="d-flex flex-row">
            <v-btn class="bg-red-darken-4 mr-6 w-25">Mua ngay</v-btn>
            <v-btn class="bg-red-darken-4" @click="addToCart"
              >Thêm vào giỏ hàng</v-btn
            >
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <!-- Other products -->
  <!-- <v-sheet class="mx-auto" max-width="600">
      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="n in 25"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'primary' : undefined"
            class="ma-2"
            rounded
            @click="toggle"
          >
            Options {{ n }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet> -->
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
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
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
