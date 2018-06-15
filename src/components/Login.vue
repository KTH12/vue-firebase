<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>
        <v-card class="elevation-12" >
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="login"
              label="Login" type="text" v-model="loginForm.email">
              </v-text-field>
              <v-text-field prepend-icon="lock" name="password"
              label="Password" id="password" type="password"
              v-model="loginForm.password">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
// import Constant from '@/packages/Constant';
import fb from '@/packages/firebaseConfig';

export default {
  props: {
    source: String,
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    login() {
      console.log('login func');
      fb.auth.signInWithEmailAndPassword(
        this.loginForm.email, this.loginForm.password,
      ).then((user) => {
        console.log('로그인성공');
        console.log(user);
        this.$auth.setUser(user.user);
        this.$store.commit('setCurrentUser', user.user);
        // this.$store.dispatch('fetchUserProfile', {
        //     state: {
        //       name: this.name,
        //       addr: this.addr,
        //     },
        //   });
        this.$router.push('/dashboard');
      }).catch((err) => {
        console.log('로그인실패');
        console.log(err);
      });
    },
  },
};
</script>
<style>

</style>
