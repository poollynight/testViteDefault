<template>
  <div>
    <h2>Confirm Email</h2>
    <p>
      Please confirm your email address by clicking the link sent to your email.
    </p>
    <button @click="resendConfirmation">Resend Confirmation Email</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.query.token,
    };
  },
  created() {
    // get confirm email token
    this.token = this.$route.query.token;
    console.log(this.token);
    // Xử lý logic xác nhận email với token
    setTimeout(() => {
      // Kiểm tra xem tab hiện tại có phải là tab cuối cùng hay không
        window.open("", "_self", "");
        // window.close();
      
    }, 2000); // 2000 milliseconds = 2 giây
  },
  methods: {
    async confirmEmail() {
      try {
        // Make your login request here using axios or any other library
        const response = await axios.post(
          `https://main.odour.site/auth/confirmEmail`,
          {
            token: this.token,
          }
        );

        // Handle the response here
        console.log(response.status);
        localStorage.setItem("avatar", response.data.body.user.avatarUrl);
        console.log(response.data.body.accessToken);
      } catch (error) {
        console.error("There was an error!", error);
      }
    },
  },
};
// console.log(this.$route.params.token);
</script>
