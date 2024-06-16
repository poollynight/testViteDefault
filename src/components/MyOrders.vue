<template>
  <v-overlay v-model="overlay" class="d-flex align-center justify-center">
    <v-progress-circular
      class="mx-auto"
      color="primary"
      indeterminate="disable-shrink"
      size="50"
      width="4"
    ></v-progress-circular>
  </v-overlay>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-tabs bg-color="white" fixed-tabs>
          <v-tab @click="getMyOrders(0)" text="Chờ thanh toán"></v-tab>
          <v-tab @click="getMyOrders(1)" text="Chờ xử lý"></v-tab>
          <v-tab @click="getMyOrders(2)" text="Đang xử lý"></v-tab>
          <v-tab @click="getMyOrders(3)" text="Đang giao hàng"></v-tab>
          <v-tab @click="getMyOrders(4)" text="Giao hàng thành công"></v-tab>
          <v-tab @click="getMyOrders(5)" text="Đã hủy"></v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-card class="history-card" v-for="order in Orders" :key="order.id">
          <router-link
            :to="'/user/orders/' + order.id"
            class="text-decoration-none text-black"
          >
            <v-card-title
              >Đơn hàng #{{ order.id }} | {{ order.status }}</v-card-title
            >
            <v-divider></v-divider>
            <v-row class="ma-3" :key="order.firstProduct.id">
              <v-col cols="12" md="6">
                <v-card-title>{{ order.firstProduct.name }}</v-card-title>
                <v-card-text>
                  <p>Số lượng: {{ order.firstProduct.sellingPrice }}</p>
                  <p>Tổng tiền: {{ order.firstProduct.total }}</p>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  :src="order.firstProduct.image"
                  aspect-ratio="1"
                  max-height="100"
                ></v-img>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </router-link>
          <v-row class="pa-3">
            <v-col cols="12"
              ><h3>Thành tiền: {{ order.price }}</h3></v-col
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      overlay: true,
      statusType: null,
      statusId: [
        "0e696741-97f6-444a-b265-025c8c394fc9",
        "f86e2f2a-5dcc-4546-a4de-ea297ee22dc5",
        "9b1f0fcc-bdd4-4e57-9444-b19c3b2f0547",
        "3a398200-af38-4832-82d9-ed65c248041b",
        "37eb8293-c17a-45a6-89ab-ba640d4001ff",
        "2f3eae5b-d4ed-4fff-ab1c-6a538721ffca",
      ],
      Orders: [],
    };
  },
  methods: {
    async getMyOrders(tabNumber) {
      this.overlay = true;
      try {
        const res = await axios.get(
          `https://main.odour.site/user/order?orderStatusId=${this.statusId[tabNumber]}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("ato")}`,
            },
          }
        );
        console.log(res.data.body);
        this.Orders = res.data.body.orders;
        this.overlay = false;
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          this.refreshToken();
        }
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
    this.getMyOrders(this.$route.query.type);
  },
};
</script>

<style scoped>
.history-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-size: 20px;
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 14px;
  color: grey;
}

.v-card-text {
  padding-top: 0;
}

.v-img {
  border-radius: 8px;
}
</style>
