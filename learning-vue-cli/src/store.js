import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    colors: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setColors(state, colorData) {
      state.colors = colorData;
    }
  },
  actions: {
    async register(context, data) {
      console.log("in store side of register");
    try {
      let response = await axios.post("/api/users", data);
      context.commit('setUser', response.data);
      return "";
    } catch (error) {
      return error.response.data.message;
    }
  },
  async login(context, data) {
    try {
      let response = await axios.post("/api/users/login", data);
      context.commit('setUser', response.data);
      return "";
    } catch (error) {
      return error.response.data.message;
    }
  },
  async logout(context) {
    try {
      await axios.delete("/api/users");
      context.commit('setUser', null);
      return "";
    } catch (error) {
      return error.response.data.message;
    }
  },
  async getUser(context) {
    try {
      let response = await axios.get("/api/users");
      context.commit('setUser', response.data);
      return "";
    } catch (error) {
      return "";
    }
  },
  async upload(context, data) {
      try {
        await axios.post('/api/colors', data);
        return "";
      } catch (error) {
        return error. response.data.message;
      }
    },
    async getMyColors(context) {
      try {
        let response = await axios.get("/api/colors");
        context.commit('setColors', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllColors(context) {
      try {
        let response = await axios.get("/api/colors/all");
        context.commit('setColors', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getColor(context, dataObject) {
      try {
        let response = await axios.get("/api/colors/one/" + dataObject.id).then(response => {
          context.commit('setPhoto', response.data);
        });
        return "";
      } catch (error) {
        return "";
      }
    },

  }
})
