import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  mid:localStorage.getItem('mid') ? localStorage.getItem('mid'):'',
  mainTitle: '',
  cid:localStorage.getItem('cid') ? localStorage.getItem('cid'):'',
  isBack: false,
  slideNav:localStorage.getItem('slideNav') ? JSON.parse(localStorage.getItem('slideNav')):[],
  userinfo:{},
  token:localStorage.getItem('token') ? localStorage.getItem('token'):'',
};

const getters = {
  cid: state => {
    return parseInt(state.cid)
  },
  mid: state => {
    return parseInt(state.mid)
  }
}

const mutations = {
    setCid (state,cid){
      state.cid=cid
      localStorage.setItem('cid',cid);
    },
    setmid (state,mid){
      state.mid=mid
      localStorage.setItem('mid',mid);
    },
    setisBack (state,flag) {
      state.isBack=flag
    },
    setMaintitle (state,t) {
      state.mainTitle=t
    },
    setSlidenav (state,arr){
        state.slideNav = arr;
        localStorage.setItem('slideNav',JSON.stringify(arr));
    },
    saveToken (state,tk){
      state.token = tk;
      localStorage.setItem('token',tk);
      console.log(localStorage.getItem('token'))
    },
    removeToken(state){
      state.token = '';
      localStorage.setItem('token','');
    }

};

const store = new Vuex.Store({
  state,
  getters,
  mutations 
})

export default store

