<template>
  <v-container>
    <v-card class="elevation-2">
      <v-card-title class="headline">Shopping Cart</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row align="center">
          <v-col cols="1"><strong></strong></v-col>
          <v-col cols="3"><strong>Product</strong></v-col>
          <v-col cols="2"><strong>Price</strong></v-col>
          <v-col cols="2"><strong>Quantity</strong></v-col>
          <v-col cols="2"><strong>Total</strong></v-col>
          <v-col cols="1"><strong>Action</strong></v-col>
        </v-row>
        <v-row v-for="(item, index) in cartItems" :key="index" align="center">
          <v-col cols="1">
            <v-checkbox
              v-model="item.selected"
              @change="updateSelection(selectedItems)"
            ></v-checkbox>
          </v-col>
          <v-col cols="3">
            <v-col cols="9">
              <div>{{ item.name }}</div>
            </v-col>
          </v-col>
          <v-col cols="2">{{ item.price }} VND</v-col>
          <v-col cols="2">
            <v-text-field
              v-model="item.quantity"
              outlined
              dense
              @input="updateQuantity(item)"
            ></v-text-field>
          </v-col>
          <v-col cols="2">{{ calculateItemTotal(item) }}</v-col>
          <v-col cols="1">
            <v-btn icon @click="removeItem(index)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-col cols="8">
          <v-row align="center">
            <v-col cols="4">
              <v-checkbox
                v-model="selectAll"
                :true-value="true"
                :false-value="false"
                label="Select All"
                @click="toggleAll"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <h3>Product(s)</h3>
              <p>{{ totalQuantity }}</p>
            </v-col>
            <v-col cols="4">
              <h3>Total</h3>
              <p>{{ totalPrice }}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn color="primary" @click="checkout">Checkout</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cartItems: [],
      productWanted: [],
      productSelected: [],
      totalQuantity: 0,
      totalPrice: 0,
      selectAll: false,
    };
  },
  computed: {
    selectedItems() {
      return this.cartItems.filter((item) => item.selected);
    },
  },
  methods: {
    async getProductsDetailFromApi() {
      try {
        this.productWanted.forEach(async (element) => {
          const res = await axios.get(
            "https://main.odour.site/product/" + element.product
          );
          const resProduct = res.data.body.product;
          const product = {
            name: resProduct.name,
            price: resProduct.unitPrice,
            quantity: element.quantity,
            imageUrl: resProduct.medias[0].storageUrl,
            selected: false,
          };
          this.cartItems.push(product);
        });
      } catch (err) {
        console.log(err);
      }
    },
    getCartProductsFromCookies() {
      const email = this.$cookies.get("e");
      const productWantedKeys = this.$cookies
        .keys()
        .filter((key) => key.startsWith("cart" + email));
      productWantedKeys.forEach((element) => {
        this.productWanted.push(this.$cookies.get(element));
      });
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.calculateTotal(this.cartItems);
    },
    calculateTotal(items) {
      this.totalQuantity = 0;
      this.totalQuantity = items.reduce(
        (total, item) => parseInt(total) + parseInt(item.quantity),
        0
      );
      this.totalPrice = 0;
      this.totalPrice = items.reduce(
        (total, item) => total + item.quantity * parseInt(item.price),
        0
      );
    },
    calculateItemTotal(item) {
      return (parseFloat(item.price) * item.quantity).toFixed(2);
    },
    toggleAll() {
      this.selectAll = !this.selectAll;
      this.cartItems.forEach((item) => (item.selected = this.selectAll));

      this.calculateTotal(this.selectedItems);
    },
    updateSelection(items) {
      if (items.length != this.cartItems.length) this.selectAll = false;
      this.calculateTotal(items);
    },
    updateQuantity(item) {
      if (!item.selected) return;
      this.calculateTotal(this.cartItems);
    },
    checkout() {
      if (this.selectedItems.length !== 0) {
        localStorage.setItem("cart", JSON.stringify(this.selectedItems));
        this.$router.push("/checkout");
      }
    },
  },
  mounted() {
    this.getCartProductsFromCookies();
    this.getProductsDetailFromApi();
  },
};
</script>

<style scoped>
.headline {
  padding: 16px;
}
</style>
