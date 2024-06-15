<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          class="history-card"
          v-for="order in penddingOrders"
          :key="order.id"
        >
          <router-link
            :to="'/user/orders/' + order.id"
            class="text-decoration-none text-black"
          >
            <v-row
              class="ma-3"
              v-for="product in order.product"
              :key="product.id"
            >
              <v-col cols="12" md="6">
                <v-card-title>{{ product.productName }}</v-card-title>
                <v-card-text>
                  <p>Số lượng: {{ product.quantity }}</p>
                  <p>Tổng tiền: {{ product.totalPrice }}</p>
                  <p class="text-uppercase text-red">{{ product.status }}</p>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  :src="product.image"
                  aspect-ratio="1"
                  max-height="150"
                ></v-img>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </router-link>
          <v-row class="pa-3">
            <v-col cols="12"><p>123</p></v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      statusType: null,
      statusId: [
        "0e696741-97f6-444a-b265-025c8c394fc9",
        "2f3eae5b-d4ed-4fff-ab1c-6a538721ffca",
        "37eb8293-c17a-45a6-89ab-ba640d4001ff",
        "3a398200-af38-4832-82d9-ed65c248041b",
        "9b1f0fcc-bdd4-4e57-9444-b19c3b2f0547",
        "f86e2f2a-5dcc-4546-a4de-ea297ee22dc5",
      ],
      penddingOrders: [
        {
          id: 1,
          product: [
            {
              id: "p1",
              productName: "Áo thun nam",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
            {
              id: "p2",
              productName: "Áo thun nam 1",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
            {
              id: "p3",
              productName: "Áo thun nam 2",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
          ],
        },
        {
          id: 2,
          product: [
            {
              id: "p1",
              productName: "Áo thun nam",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
            {
              id: "p2",
              productName: "Áo thun nam 1",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
            {
              id: "p3",
              productName: "Áo thun nam 2",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
          ],
        },
        {
          id: 3,
          product: [
            {
              id: "p1",
              productName: "Áo thun nam",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
            {
              id: "p2",
              productName: "Áo thun nam 1",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
            {
              id: "p3",
              productName: "Áo thun nam 2",
              orderDate: "2024-06-01",
              quantity: 2,
              totalPrice: 200000,
              image: "https://via.placeholder.com/300",
              status: "Chờ xác nhận",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.statusType = this.$route.query.type;
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
