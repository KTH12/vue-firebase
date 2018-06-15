<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :counter="4"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        label="이름"
        required
      ></v-text-field>
      <v-text-field
        v-model="addr"
        label="주소"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        @click="signup"
      >
        submit
      </v-btn>
      <v-btn >clear</v-btn>
    </v-form>
  </div>
</template>
<script>
// import { mapActions, mapMutations } from 'vuex';
import fb from '@/packages/firebaseConfig';

export default {

  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 4) || 'Name must be less than 4 characters',
      ],
      addr: '',
      name: '',
    };
  },
  created() {
  },
  methods: {
    signup() {
      fb.auth.createUserWithEmailAndPassword(
        this.email, this.password,
      ).then((user) => {
        this.$store.commit('setCurrentUser', user.user);
        // create user obj
        fb.usersCollection.doc(user.user.uid).set({
          name: this.name,
          addr: this.addr,
        }).then(() => {
          this.$store.dispatch('fetchUserProfile', {
            state: {
              name: this.name,
              addr: this.addr,
            },
          });
          this.$router.push('/dashboard');
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
<style>

</style>
