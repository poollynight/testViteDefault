<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="15"
      :total-visible="7"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
};
</script>
