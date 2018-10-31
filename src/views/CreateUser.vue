<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120"> -->
                  <h1 class="flex my-4 primary--text">Create New User</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="name" label="Name" type="text" v-model="model.name"></v-text-field>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.login"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password_confirmation" type="password" v-model="model.password_confirmation"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="create_user" :loading="loading">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    model: {
      name: "",
      login: "",
      password: "",
      password_confirmation: ""
    }
  }),

  methods: {
    create_user() {
      this.loading = true;
      let userData = {
        name: this.model.name,
        email: this.model.login,
        password: this.model.password
      };
      axios({
        url: "api/create_user",
        data: userData,
        method: "POST"
      })
        .then(resp => {
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          this.loading = false;
          console.log("Falhou: ", err);
        });
      //setTimeout(() => {
      //  this.$router.push("/dashboard");
      //}, 1000);
    }
  }
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
