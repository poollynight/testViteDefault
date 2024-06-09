<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card class="elevation-2">
          <v-card-title class="headline">User Profile</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Name"
                  v-model="user.name"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Email"
                  v-model="user.email"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Age"
                  v-model="user.age"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <!-- Add more profile information fields here -->
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        // Add more profile information here
      },
    };
  },
  methods: {
    editProfile() {
      // Navigate to the edit profile page
      this.$router.push("/edit-profile");
    },
    logout() {
      // Implement logout logic, such as clearing authentication tokens or cookies
      // Then navigate to the login page
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
