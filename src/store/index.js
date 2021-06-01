import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    auth: "",
    user_id: "",
    user_name:""
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user_id(state, payload) {
      state.user_id = payload;
    },
    user_name(state, payload) {
      state.user_name = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios
        .post(
          "https://floating-shelf-94821.herokuapp.com/api/v1/login",
          {
            email: email,
            password: password
          }
      )
        .catch((error) => {
          alert("メールアドレスまたはパスワードが間違っています");
          console.log(error);
        });
      commit("auth", responseLogin.data.auth);
      commit("user_id", responseLogin.data.data.id);
      commit("user_name", responseLogin.data.data.user_name);
      router.replace("/");
    },
    logout({ commit }) {
      axios
        .post("https://floating-shelf-94821.herokuapp.com/api/v1/logout",
          {
            auth: this.state.auth,
          })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/logout");
        })
        .catch((error) => {
          console.log(error);
        });        
    }
  },
  modules: {
  }
})
