<template>
  <v-container fluid id="background">
    <v-row justify="center">
      <v-col cols="10" md="4" sm="5" justify="center" align="center">
        <v-sheet class="bg-white rounded form">
           </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {
  },
};
</script>
<style>
#background {
  background-image: url("/src/assets/carousel_4.jpg");
  background-size: cover;
  min-height: 90vh;
}
.form {
  width: 100%;
}
</style>
