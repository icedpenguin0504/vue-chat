<template>
  <div id="app">
    <header>
      <div class="header-left">
        <p>Chat App with Vue.js</p>
      </div>
      <div v-if="user.uid" class="header-right">
        <p>{{ user.displayName }}</p>
        <button @click="doLogout">Logout</button>
      </div>
      <div v-else class="header-right">
        <button @click="doLogin">Login</button>
      </div>
    </header>
    <div class="main">
      <Chat
        v-for="{key, name, image, message } in chat"
        :name="name"
        :image="image"
        :message="message"
        :key="key"/>
    </div>
    <form action="">
      <textarea
        placeholder="Press Enter to send."
        @keydown.enter.exact.prevent="doSend"
        v-model="text"
        :disabled="!user.uid"></textarea>
    </form>
  </div>
</template>

<script>
import Chat from './components/Chat.vue';
import firebase from 'firebase';

export default {
  name: 'app',
  components: {
    Chat
  },
  data() {
    return {
      chat: [],
      text: '',
      user: {}
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user : {};
      const ref_message = firebase.database().ref('message');
      if (user) {
        this.chat = [];
        ref_message.limitToLast(10).on('child_added', this.childAdded);
      } else {
        ref_message.limitToLast(10).off('child_added', this.childAdded);
      }
    })
  },
  methods: {
    doSend() {
      if (this.user.uid && this.text.length) {
        firebase.database().ref('message').push({
          message: this.text,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => {
          this.text = '';
        })
      }
    },
    scrollToBottom() {
      // scrolls after DOM is inserted
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    doLogout() {
      firebase.auth().signOut();
    },
    childAdded(snap) {
      const message = snap.val();
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      });
      this.scrollToBottom();
    }
  }
}
</script>

<style lang="scss">
$base-color: #1BAF85;
$width: 600px;
$form-height: 90px;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

header {
  background-color: $base-color;
  color: white;
  height: 40px;
  width: 100%;
  line-height: 40px;
  position: fixed;
  top: 0;

  .header-left {
    width: 50%;
    display: inline-block;

    p {
      margin: 0;
      margin-left: 40px;
    }
  }

  .header-right {
    width: 50%;
    display: inline-block;
    text-align: right;

    p {
      margin: 0;
      display: inline-block;
      font-size: 14px;
    }

    button {
      display: inline-block;
      margin-right: 40px;
      width: 80px;
      height: 30px;
      border: 1px solid white;
      border-radius: 3px;
      background-color: $base-color;
      color: white;
      font-size: 16px;
      outline: none;
    }
  }
}

.main {
  width: $width;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 80px;
}

form {
  height: $form-height;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: white;

  textarea {
    display: inline-block;
    width: $width;
    height: calc(100% - 10px);
    resize: none;
    outline: none;
    font-size: 16px;
  }
}

</style>
