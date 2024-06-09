<template></template>
<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      if (!this.$cookies.get("ato")) {
        this.$router.push("/");
      } else {
        this.$cookies.remove("ato");
        this.$cookies.remove("confe");
        this.$cookies.remove("e");
        location.reload();
      }
    },
  },
  mounted() {
    this.logout();
  },
};
</script>
