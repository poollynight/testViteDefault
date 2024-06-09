<template>
  <v-row justify="center">
    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar :image="avatar" size="40"></v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar :image="avatar" size="40"></v-avatar>
            <h3>{{ user.email }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <router-link to="/profile">
              <v-btn variant="text" rounded>
                Quản lí tài khoản
              </v-btn></router-link
            >
            <v-divider class="my-3"></v-divider>
            <router-link to="/profile">
              <v-btn variant="text" rounded>
                Đơn hàng của tôi
              </v-btn></router-link
            >
            <v-divider class="my-3"></v-divider>
            <router-link to="/logout" class="text-decoration-none text-red">
              <v-btn variant="text" rounded> Đăng xuất </v-btn></router-link
            >
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    avatar: "",
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "",
    },
  }),
  methods: {},
  mounted() {
    this.avatar = localStorage.getItem("avatar");
    this.user.email = this.$cookies.get("e");
  },
};
</script>
