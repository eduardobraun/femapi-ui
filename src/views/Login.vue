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
                  <h1 class="flex my-4 primary--text">Login</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" :to="'signup'">New User</v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { onLogin } from "../vue-apollo";
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    model: {
      username: "",
      password: ""
    }
  }),

  methods: {
    login() {
      this.loading = true;
      let loginData = {
        username: this.model.username,
        password: this.model.password
      };
      axios({
        url: "api/signin",
        data: loginData,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.token;
          const apolloClient = this.$apollo.provider.defaultClient;
          onLogin(apolloClient, token);
          this.loading = false;
          this.$router.push({ name: "home" });
          return { token: token };
        })
        .catch(err => {
          //commit(AUTH_ERROR, err)
          //localStorage.removeItem('user-token')
          //reject(err)
          this.loading = false;
          // throw err;
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
