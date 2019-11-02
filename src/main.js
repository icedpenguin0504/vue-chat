import firebase from 'firebase'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBWS0Z73oNJk8fMDWf_Uh3wXaksYLR8UlM",
  authDomain: "vue-chat-7d692.firebaseapp.com",
  databaseURL: "https://vue-chat-7d692.firebaseio.com",
  projectId: "vue-chat-7d692",
  storageBucket: "vue-chat-7d692.appspot.com",
  messagingSenderId: "10848147312",
  appId: "1:10848147312:web:fcd8eff5dd874ccd6061b5",
  measurementId: "G-H55V2NESKG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  render: h => h(App),
}).$mount('#app')
