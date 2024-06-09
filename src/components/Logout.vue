<template></template>
<script>
import axios from "axios";
export default {
  name: "Logout",
  methods: {
    logout() {
      try {
        const res = axios.get("https://main.odour.site/auth/logout");
        if (!this.$cookies.get("ato")) {
          this.$router.push("/");
        } else {
          this.$cookies.remove("ato");
          this.$cookies.remove("confe");
          this.$cookies.remove("e");
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.logout();
  },
};
</script>
