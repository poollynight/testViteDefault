<template>
  <v-container>
    <v-responsive class="elevation-2">
      <v-overlay v-model="overlay" class="d-flex align-center justify-center">
        <v-progress-circular
          class="mx-auto"
          color="primary"
          indeterminate="disable-shrink"
          size="50"
          width="4"
        ></v-progress-circular>
      </v-overlay>
      <v-card-title class="headline">Shopping Cart</v-card-title>
      <v-divider></v-divider>
      <v-row align="center" no-gutters class="card-header">
        <v-col cols="1"><strong></strong></v-col>
        <v-col cols="3"><strong>Product</strong></v-col>
        <v-col cols="2"><strong>Price (VND)</strong></v-col>
        <v-col cols="2" class="text-center"><strong>Quantity</strong></v-col>
        <v-col cols="2"><strong>Total (VND)</strong></v-col>
        <v-col cols="1"><strong></strong></v-col>
      </v-row>
      <v-row
        v-for="(item, index) in cartItems"
        :key="index"
        align="center"
        class="cart-item"
      >
        <v-col cols="1">
          <v-checkbox
            v-model="item.selected"
            @change="updateSelection(selectedItems)"
          ></v-checkbox>
        </v-col>
        <v-col cols="3">
          <v-col cols="9">
            <router-link :to="'/product/' + item.id" class="cursor-pointer">
              <div>{{ item.name }}</div></router-link
            >
          </v-col>
        </v-col>
        <v-col cols="2">{{ item.unitPrice }}</v-col>
        <v-col cols="2">
          <v-text-field
            max-width="140"
            v-model="item.quantity"
            outlined
            dense
            @keydown.enter="updateCart(item, index)"
          >
            <template v-slot:prepend>
              <div
                class="pe-4"
                align="center"
                @click="updateCartSubtractQuantity(item, index)"
              >
                <v-fab
                  color="red-darken-4"
                  location="start start"
                  size="1.7vw"
                  appear
                  ><v-icon>mdi-minus</v-icon></v-fab
                >
              </div>
            </template>
            <template v-slot:append>
              <div
                class="pe-4"
                align="center"
                @click="updateCartAddQuantity(item, index)"
              >
                <v-fab
                  color="red-darken-4"
                  location="start start"
                  size="1.7vw"
                  appear
                  ><v-icon>mdi-plus</v-icon></v-fab
                >
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2">{{ item.totalPrice }}</v-col>
        <v-col cols="1">
          <v-btn icon @click="removeProductFromCart(item, index)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-actions class="card-footer">
        <v-col cols="8">
          <v-row align="center">
            <v-col cols="4">
              <v-checkbox
                class="card-footer"
                v-model="selectAll"
                :true-value="true"
                :false-value="false"
                @click="toggleAll"
                >Select All</v-checkbox
              >
            </v-col>
            <v-col cols="4">
              <h3>Product(s)</h3>
              <p>{{ totalQuantity }}</p>
            </v-col>
            <v-col cols="4">
              <h3>Total (VND)</h3>
              <p>{{ totalPrice }}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn color="primary" class="checkout-btn" @click="checkout"
            >Checkout</v-btn
          >
        </v-col>
      </v-card-actions>
    </v-responsive>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      overlay: false,
      cartItems: [],
      cartItemsCopy: null,
      productWanted: [],
      totalQuantity: 0,
      totalPrice: 0,
      selectAll: false,
      isLogin: false,
      oldQuantity: 0,
    };
  },
  computed: {
    selectedItems() {
      return this.cartItems.filter((item) => item.selected);
    },
  },
  methods: {
    async syncGuestCart() {},
    async removeProductFromCart(item, index) {
      if (this.isLogin == false) {
        try {
          const res = await axios.post(
            "https://main.odour.site/guest/cart/remove",
            {
              productId: item.id,
              quantity: item.quantity,
            }
          );
          this.cartItems = res.data.body.orderItems;
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const response = await axios.post(
            "https://main.odour.site/user/cart/remove",
            {
              productId: item.id,
              quantity: item.quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("ato")}`,
              },
            }
          );
          if (response.status == 200) this.cartItems.splice(index, 1);
        } catch (error) {
          console.log(error);
        }
      }
    },
    calculateTotal(items) {
      this.totalQuantity = 0;
      this.totalQuantity = items.reduce(
        (total, item) => parseInt(total) + parseInt(item.quantity),
        0
      );

      this.totalPrice = 0;
      this.totalPrice = items.reduce(
        (total, item) => parseInt(total) + parseInt(item.totalPrice),
        0
      );
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
    updateQuantity(item, index, operator) {
      operator == "add"
        ? this.cartItems[index].quantity++
        : this.cartItems[index].quantity--;
      this.cartItems[index].totalPrice = item.unitPrice * item.quantity;
      this.overlay = false;
      if (!item.selected) return;
      this.calculateTotal(this.selectedItems);
    },
    checkout() {
      if (this.selectedItems.length !== 0) {
        localStorage.setItem("cart", JSON.stringify(this.selectedItems));
        if (this.isLogin == false) {
          this.$router.push("/login", { query: { redirect: "/checkout" } });
        }
        this.$router.push("/checkout");
      }
    },
    async getCartFromAPI() {
      if (this.isLogin == false) {
        try {
          const res = await axios.get("https://main.odour.site/guest/cart");
          this.cartItems = JSON.parse(JSON.stringify(res.data.body.orderItems));
          this.cartItemsCopy = JSON.parse(
            JSON.stringify(res.data.body.orderItems)
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await axios.get("https://main.odour.site/user/cart", {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          });
          this.cartItems = Array.from(res.data.body.orderItems);
          this.cartItemsCopy = Array.from(res.data.body.orderItems);
          console.log(this.cartItems);
        } catch (err) {
          console.log(err);
          if (err.response.status == 401) {
            this.refreshToken();
          }
        }
      }
    },

    // click plus button
    async updateCartAddQuantity(product, index) {
      if (product.quantity == 0) return;
      this.overlay = true;
      if (this.isLogin == false) {
        try {
          const res = await axios.post(
            "https://main.odour.site/guest/cart/add",
            {
              productId: product.id,
              quantity: 1,
            }
          );
          this.updateQuantity(product, index, "add");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios.post(
            "https://main.odour.site/user/cart/add",
            {
              productId: product.id,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("ato")}`,
              },
            }
          );
          this.updateQuantity(product, index, "add");
        } catch (error) {
          console.log(error);
          if (error.response.status == 401) {
          }
        }
      }
    },

    // click minus button
    async updateCartSubtractQuantity(product, index) {
      if (product.quantity == 0) return;
      this.overlay = true;
      if (this.isLogin == false) {
        try {
          const res = await axios.post(
            "https://main.odour.site/guest/cart/remove",
            {
              productId: product.id,
              quantity: 1,
            }
          );
          this.updateQuantity(product, index, "remove");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios.post(
            "https://main.odour.site/user/cart/remove",
            {
              productId: product.id,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("ato")}`,
              },
            }
          );
          this.updateQuantity(product, index, "remove");
        } catch (error) {
          console.log(error);
          if (error.response.status == 401) {
          }
        }
      }
    },

    // change number of quantity
    async updateCart(product, index) {
      if (product.quantity == 0) return;
      this.overlay = true;
      var apiRoute = this.isLogin === false ? "guest" : "user";
      var apiURL;
      if (product.quantity < this.cartItemsCopy[index].quantity)
        apiURL = `https://main.odour.site/${apiRoute}/cart/remove`;
      else apiURL = `https://main.odour.site/${apiRoute}/cart/add`;
      try {
        await axios.post(
          `${apiURL}`,
          {
            productId: product.id,
            quantity: Math.abs(
              product.quantity - this.cartItemsCopy[index].quantity
            ),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          }
        );

        this.cartItemsCopy[index].quantity = product.quantity;
        this.cartItems[index].quantity = product.quantity;
        this.cartItems[index].totalPrice = product.unitPrice * product.quantity;
        this.overlay = false;
      } catch (error) {
        console.log(error);
      }
    },

    async refreshToken() {
      try {
        const response = await axios.post(
          "https://main.odour.site/auth/refreshAccessToken",
          {
            refreshToken: this.$cookies.get("rt"),
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          }
        );
        this.$cookies.set("ato", response.data.body.newAccessToken);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    if (this.$cookies.get("ato") !== null) this.isLogin = true;
    this.getCartFromAPI();
  },
};
</script>

<style scoped>
.headline {
  padding: 16px;
}
@media screen and (max-width: 650px) {
  .headline {
    font-size: 1em;
  }
  .card-footer,
  .card-footer .checkout-btn {
    font-size: 1.5vw;
  }

  .card-footer .v-input--selection-controls__input .v-icon {
    font-size: 16px; /* Change the font size here */
  }
  .card-header {
    font-size: 1.5vw;
  }
  .cart-item {
    font-size: 2vw;
  }
}
</style>
