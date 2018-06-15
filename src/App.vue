<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        fixed
        app
      >
        <v-list dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link tag="li" to="/dashboard">
                  <a>이야기방</a>
                </router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <v-list-tile-title>
                  <router-link tag="li" to="/signup">
                    <a>회원가입</a>
                  </router-link>
                </v-list-tile-title>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link tag="li" to="/login">
                  <a>로그인</a>
                </router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <a @click="logout">로그아웃</a>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-toolbar>
      <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
        >
          <v-flex >
            <!-- 라우터 -->
            <router-view/>
            <!-- 라우터 -->
          </v-flex>
        </v-layout>
      </v-container>
      </v-content>
      <v-footer color="indigo" app>
        <span class="white--text">&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import fb from '@/packages/firebaseConfig';

export default {
  data: () => ({
    drawer: null,
  }),
  props: {
    source: String,
  },
  methods: {
    logout() {
      fb.auth.signOut()
        .then(() => {
          console.log('로그아웃 성공');
          this.$auth.destroyToken();
          this.$router.push('/dashboard');
        })
        .catch(() => {
          console.log('로그아웃 실패');
        });
    },
  },
};
</script>

<style>
</style>
