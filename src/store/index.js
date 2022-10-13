import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messe: ''
  },
  getters: {
  },
  mutations: {
    //メソッドからの指示を受けてstateを操作する
    detail(state, nume) {
      //クリックされた国のnumericを取得
      state.messe = nume;
    }
  },
  actions: {
  },
  modules: {
  }
})
