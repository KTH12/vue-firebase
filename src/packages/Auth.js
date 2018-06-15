export default function (Vue) {
  const VueVm = Vue;
  VueVm.auth = {
    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
      return JSON.parse(localStorage.getItem('user'));
    },

    destroyToken() {
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('user');
    },
  };

  Object.defineProperties(VueVm.prototype, {
    $auth: {
      get() {
        return VueVm.auth;
      },
    },
  });
}
