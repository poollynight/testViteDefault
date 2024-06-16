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
    <v-alert
      style="z-index: 100; position: relative"
      v-model="showAlert"
      text=""
      title="Đặt hàng thành công"
      type="success"
    ></v-alert>
    <v-alert
      style="z-index: 100; position: relative"
      v-model="showAlertDanger"
      text=""
      :title='alertDangerTitle'
      type="red-darken-2"
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
            <v-form>
              <v-text-field
                v-model="customer.name"
                label="Họ và tên"
                :rules="stringRules"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="customer.phone"
                label="Số điện thoại"
                :rules="stringRules"
                variant="solo"
              ></v-text-field>
              <v-select
                v-model="customer.province"
                :items="provinceNames"
                label="Tỉnh/Thành phố"
                variant="solo"
              ></v-select>
              <v-select
                v-model="customer.district"
                :items="districtNames"
                label="Quận/Huyện"
                variant="solo"
              ></v-select>
              <v-select
                v-model="customer.ward"
                :items="wardNames"
                label="Phường/Xã"
                variant="solo"
              ></v-select>
              <v-text-field
                v-model="customer.address"
                label="Địa chỉ"
                :rules="stringRules"
                variant="solo"
              ></v-text-field>
              <v-select
                v-model="customer.payMethod"
                :items="getPayMethod"
                label="Phương thức thanh toán"
                variant="solo"
              ></v-select>
              <v-btn color="red-darken-4" @click="submitOrder" type="button"
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
      productQuantity: 0,
      overlay: false,
      cartItems: [],
      apiCartInput: [],
      customer: {
        name: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        payMethod: "",
      },
      provinces: [], // Example data for provinces
      districts: [], // Example data for districts
      wards: [], // Example data for wards
      payMethods: [
        {
          id: "845e7be4-b3e3-4483-9fde-65694ee2d9b9",
          name: "Thanh toán khi nhận hàng",
        },
        { id: "885e24a5-2e53-4c91-8a44-281be8fe4a17", name: "Chuyển khoản" },
      ],
      showAlert: false,
      showAlertDanger: false,
      alertDangerTitle: '',
      totalPrice: 0,
      stringRules: [(v) => !!v || "Trường này không được để trống"],
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
    getPayMethod() {
      return this.payMethods.map((payMethod) => payMethod.name);
    },
  },
  methods: {
    loadBill() {
      this.cartItems = JSON.parse(localStorage.getItem("cart"));
      this.cartItems.forEach((element) => {
        var obj = {
          productId: element.id,
          quantity: element.quantity,
        };
        this.apiCartInput.push(obj);
      });
    },
    async submitOrder() {
      this.showAlertDanger = false
      this.overlay = true;
      var count = 0;
      for (let key in this.customer) {
        if (this.customer[key] !== "") {
          count++;
        }
      }
      if (count === 7) {
        try {
          await axios.post(
            "https://main.odour.site/user/order/",
            {
              fullname: this.customer.name,
              phoneNumber: this.customer.phone,
              deliveredAddress:
                this.customer.province +
                "," +
                this.customer.district +
                "," +
                this.customer.ward +
                "," +
                this.customer.address,
              orderNote: "no",
              paymentMethodId: this.payMethods.find(
                (item) => item.name === this.customer.payMethod
              ).id,
              orderItems: this.apiCartInput,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("ato")}`,
              },
            }
          );
          console.log("Order created successfully");
          this.showAlert = true;
          this.overlay = false;
          this.$emit("remove-from-cart", this.productQuantity);
        } catch (err) {
          console.log(err);
          if (err.response.status == 401) {
            this.alertDangerTitle = "Lỗi hệ thống!";
            this.showAlertDanger = true;
            this.refreshToken();
          }
        }
      } else{
        this.alertDangerTitle = "Vui lòng nhập đủ các trường!";
        this.showAlertDanger = true;
        this.overlay = false;
      }
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
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
    this.loadBill();
    this.getVietnamProvinces();
    this.apiCartInput.forEach(element => {
      this.productQuantity += element.quantity
    });
  },
};
</script>

<style scoped>
.headline {
  padding: 16px;
}
</style>
