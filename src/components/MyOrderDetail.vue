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
    <v-row></v-row>
    <v-row>
      <v-col cols="12">
        <h2>Chi tiết đơn hàng</h2>
        <v-card style="overflow-x: visible">
          <v-card-title>
            Đơn hàng #{{ id }} | {{ order.orderStatusName }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-subheader>Thông tin đơn hàng</v-subheader>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Ngày giao:</v-list-item-title>
                      <v-list-item-subtitle
                        v-if="order.deliveredAt !== '0001-01-01T00:00:00Z'"
                        >{{ order.date }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Tổng giá:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.totalPrice
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Phương thức thanh toán:</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        order.paymentMethodName
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
                        order.fullName
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Địa chỉ:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.deliveredAddress
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Số điện thoại:</v-list-item-title>
                      <v-list-item-subtitle>{{
                        order.phoneNumber
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
              <v-list-item-group
                v-for="item in order.orderItems"
                :key="item.id"
              >
                <v-list-item>
                  <v-list-item-content>
                    <router-link
                      :to="'/product/' + item.id"
                      class="cursor-pointer text-decoration-none text-black"
                    >
                      <v-row class="ma-3">
                        <v-col cols="12" md="6">
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.sellingQuantity }} x
                            {{ item.sellingPrice }}
                          </v-list-item-subtitle>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-list-item-title>
                            <v-img
                              :src="item.image"
                              aspect-ratio="1"
                              max-height="100"
                            ></v-img>
                          </v-list-item-title>
                        </v-col>
                      </v-row>
                    </router-link>
                  </v-list-item-content>
                  <v-divider></v-divider>
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
import axios from "axios";
export default {
  data() {
    return {
      overlay: true,
      id: null,
      order: [],
    };
  },
  methods: {
    async getOrderDetail() {
      try {
        const res = await axios.get(
          `https://main.odour.site/user/order/${this.id}`,
          {
            headers: { Authorization: `Bearer ${this.$cookies.get("ato")}` },
          }
        );
        this.order = res.data.body;
        console.log(res.data.body);
        this.overlay = false;
      } catch (error) {
        console.log(error);
        this.refreshToken();
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
    this.id = this.$route.params.id;
    this.getOrderDetail();
  },
};
</script>

<style scoped>
/* Add custom styles as needed */
</style>
