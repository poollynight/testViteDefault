<template>
  <v-container>
    <v-alert
      style="z-index: 100; position: relative"
      v-model="showAlert"
      text=""
      title="Đặt hàng thành công"
      type="success"
    ></v-alert>
    <v-row class="mt-5">
      <!-- Column for Product Information -->
      <v-col cols="12" sm="6">
        <v-card class="elevation-2">
          <v-card-title class="headline">Thông tin đơn hàng</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Sản phẩm</th>
                    <th class="text-center">Số lượng</th>
                    <th class="text-center">Đơn giá (VND)</th>
                    <th class="text-center">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartItems" :key="index">
                    <td class="text-center">{{ item.name }}</td>
                    <td class="text-center">{{ item.quantity }}</td>
                    <td class="text-center">{{ item.unitPrice }}</td>
                    <td class="text-center">
                      {{ item.totalPrice }}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Tổng cộng:</td>
                    <td>{{ calculateTotal }}</td>
                  </tr>
                </tbody>
              </template>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Column for Checkout Form -->
      <v-col cols="12" sm="6">
        <v-card class="elevation-2">
          <v-card-title class="headline">Địa chỉ nhận hàng</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- Checkout Form -->
            <v-form @submit.prevent="submitOrder">
              <v-text-field
                v-model="customer.name"
                label="Họ và tên"
              ></v-text-field>
              <v-text-field
                v-model="customer.phone"
                label="Số điện thoại"
              ></v-text-field>
              <v-select
                v-model="customer.province"
                :items="provinceNames"
                label="Tỉnh/Thành phố"
              ></v-select>
              <v-select
                v-model="customer.district"
                :items="districtNames"
                label="Quận/Huyện"
              ></v-select>
              <v-select
                v-model="customer.ward"
                :items="wardNames"
                label="Phường/Xã"
              ></v-select>
              <v-text-field
                v-model="customer.address"
                label="Địa chỉ"
              ></v-text-field>
              <v-btn color="red-darken-4" @click="submitOrder" type="submit"
                >Đặt hàng</v-btn
              >
            </v-form>
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
      cartItems: [{ name: "Product 1", quantity: 2, price: 10 }],
      customer: {
        name: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        address: "",
      },
      provinces: [], // Example data for provinces
      districts: [], // Example data for districts
      wards: [], // Example data for wards
      showAlert: false,
      totalPrice: 0,
    };
  },
  watch: {
    showAlert() {
      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
    "customer.province"() {
      this.getVietnamDistricts(
        this.provinces.find(
          (province) => province.name === this.customer.province
        ).id
      );
    },
    "customer.district"() {
      this.getVietnamwards(
        this.districts.find(
          (district) => district.name === this.customer.district
        ).id
      );
    },
  },
  computed: {
    calculateTotal() {
      this.totalPrice = 0;
      this.cartItems.forEach((item) => {
        this.totalPrice += item.totalPrice;
      });
      return this.totalPrice;
    },
    provinceNames() {
      return this.provinces.map((province) => province.name);
    },
    districtNames() {
      return this.districts.map((district) => district.name);
    },
    wardNames() {
      return this.wards.map((ward) => ward.name);
    },
  },
  methods: {
    loadBill() {
      this.cartItems = JSON.parse(localStorage.getItem("cart"));
    },
    submitOrder() {
      for (let key in this.customer) {
        if (this.customer[key] !== "") {
          this.showAlert = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }
      }
    },
    async getVietnamProvinces() {
      try {
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        const fullData = response.data.data;
        fullData.forEach((element) => {
          this.provinces.push({ id: element.id, name: element.full_name });
        });
      } catch (err) {
        console.log(err);
      }
    },

    async getVietnamDistricts(provinceId) {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
        );
        const fullData = response.data.data;
        this.districts.length = 0;
        fullData.forEach((element) => {
          this.districts.push({ id: element.id, name: element.full_name });
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getVietnamwards(districtId) {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
        );
        const fullData = response.data.data;
        this.wards.length = 0;
        fullData.forEach((element) => {
          this.wards.push({ id: element.id, name: element.full_name });
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.loadBill();
    this.getVietnamProvinces();
  },
};
</script>

<style scoped>
.headline {
  padding: 16px;
}
</style>
