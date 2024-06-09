<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="history-card" v-for="(order, index) in orders" :key="index">
          <v-card-title>{{ order.productName }}</v-card-title>
          <v-card-subtitle>Ngày đặt hàng: {{ order.orderDate }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <p>Số lượng: {{ order.quantity }}</p>
                <p>Tổng tiền: {{ order.totalPrice }}</p>
              </v-col>
              <v-col cols="12" md="6">
                <v-img :src="order.image" aspect-ratio="1" max-height="150"></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        { productName: 'Áo thun nam', orderDate: '2024-06-01', quantity: 2, totalPrice: 200000, image: 'https://via.placeholder.com/150' },
        { productName: 'Quần jeans nữ', orderDate: '2024-05-30', quantity: 1, totalPrice: 350000, image: 'https://via.placeholder.com/150' },
        { productName: 'Giày thể thao', orderDate: '2024-05-25', quantity: 1, totalPrice: 500000, image: 'https://via.placeholder.com/150' }
      ]
    };
  }
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
