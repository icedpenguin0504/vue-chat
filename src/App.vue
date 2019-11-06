<template>
  <div id="app">
    <header>Chat App with Vue.js</header>
    <div class="main">
      <Chat
        v-for="(msg, index) in chat"
        :message="msg"
        :key="index"/>
    </div>
    <form action="">
      <textarea
        placeholder="Press Enter to send."
        @keydown.enter.exact.prevent="doSend"
        v-model="text"></textarea>
    </form>
  </div>
</template>

<script>
import Chat from './components/Chat.vue';

export default {
  name: 'app',
  components: {
    Chat
  },
  data() {
    return {
      chat: [],
      text: ''
    }
  },
  methods: {
    doSend() {
      const text = this.text;
      this.chat.push(text);
      this.text = '';
      this.scrollToBottom();
    },
    scrollToBottom() {
      // scrolls after DOM is inserted
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
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
  padding-left: 40px;
  position: fixed;
  top: 0;

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
