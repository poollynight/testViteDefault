<template>
    {{ id }}
  <v-container>
    <v-row></v-row>
    <v-row>
      <v-col cols="12">
        <h2>Chi tiết đơn hàng</h2>
        <v-card style="overflow-x: visible">
          <v-card-title> Order #{{ order.id }} </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-subheader>Thông tin đơn hàng</v-subheader>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Ngày đặt:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.date
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Tổng giá:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.total
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Phương thức thanh toán:</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        order.paymentMethod
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- Add more order details as needed -->
                </v-list>
              </v-col>
              <v-col cols="12" sm="6">
                <v-subheader>Thông tin khách hàng</v-subheader>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Họ tên:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.shipping.name
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Địa chỉ:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.shipping.address
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Số điện thoại:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.shipping.phone
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- Add more shipping details as needed -->
                </v-list>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-subheader>Chi tiết sản phẩm</v-subheader>
            <v-list dense>
              <v-list-item-group v-for="item in order.items" :key="item.id">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ item.quantity }} x
                      {{ item.price }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
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
      id: null,
      order: {
        id: 123,
        date: "2024-06-15",
        total: "$150.00",
        paymentMethod: "Credit Card",
        shipping: {
          name: "John Doe",
          address: "123 Main St, Anytown, USA",
          phone: "123-456-7890",
        },
        items: [
          { id: 1, name: "Product A", quantity: 2, price: "$50.00" },
          { id: 2, name: "Product B", quantity: 1, price: "$50.00" },
          { id: 3, name: "Product C", quantity: 3, price: "$50.00" },
          // Add more items as needed
        ],
      },
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
};
</script>

<style scoped>
/* Add custom styles as needed */
</style>
