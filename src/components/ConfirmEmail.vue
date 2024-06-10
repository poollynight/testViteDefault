<template>
  <v-container>
    <!-- loading dialog when click signup and all conditions meet -->
    <div class="pa-4 text-center">
      <v-dialog
        v-model="loadDialog"
        max-width="320"
        max-height="300"
        persistent
      >
        <v-list
          class="py-2"
          color="primary"
          align="center"
          elevation="12"
          rounded="lg"
        >
          <v-list-item>
            <p class="text-center">
              Mọi thứ đang được thực hiện. <br />
              Vui lòng đợi...
            </p>
            <v-progress-circular
              class="mt-3"
              color="primary"
              indeterminate="disable-shrink"
              size="50"
              width="2"
            ></v-progress-circular>
          </v-list-item>
        </v-list>
      </v-dialog>
    </div>

    <!-- Success dialog when send mail success (after loading) -->
    <div class="pa-4 text-center">
      <v-dialog
        v-model="loadSuccessDialog"
        max-width="450"
        max-height="400"
        persistent
      >
        <v-list
          class="py-2"
          color="primary"
          align="center"
          elevation="12"
          rounded="lg"
        >
          <v-list-item>
            <template v-slot:prepend>
              <div class="pe-4" align="center">
                <v-fab
                  key="success"
                  color="success"
                  icon="mdi-share-variant"
                  class="mb-4"
                  location="start start"
                  size="50"
                  app
                  appear
                  ><v-icon>mdi-check</v-icon></v-fab
                >
              </div>
            </template>
            <p class="text-center pa-4 text-success">
              Email đã được xác thực!
            </p>
            <v-btn
              @click="
                loadSuccessDialog = false;
                $route.push('/login');
              "
              class="mb-1"
              >Đóng</v-btn
            >
          </v-list-item>
        </v-list>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: this.$route.query.token,
      loadDialog: false,
      loadSuccessDialog: false,
    };
  },
  async created() {
    // get confirm email token
    this.token = this.$route.query.token;
    console.log(this.token);
    // Xử lý logic xác nhận email với token
      this.loadDialog = true;
      try {
        // Make your login request here using axios or any other library
        const response = await axios.post(
          `https://main.odour.site/auth/confirmEmail`,
          {
            token: this.token,
          }
        );

        // Handle the response here
        this.loadDialog = false
        this.loadSuccessDialog = true
      } catch (error) {
        // if(error.response.status == 409) this.loadDialog = false
        // console.error("There was an error!", error.response.status);
      }
    setTimeout(() => {
      window.open("", "_self", "");
      // window.close();
    }, 2000); // 2000 milliseconds = 2 giây
  },
};
// console.log(this.$route.params.token);
</script>
