<template>
  <div class="list">
    <div class="image">
      <img :src="$props.image" width="40" height="40">
    </div>
    <div class="chat">
      <p class="name">{{ $props.name }}</p>
      <div class="baloon">{{ $props.message }}</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'chat',
    props: ['name', 'image', 'message']
  }
</script>

<style lang="scss">
$baloon-color: lightgray;

.list {
  margin-top: 10px;
}

.image {
  display: inline-block;

  > img {
    border-radius: 50%;
  }
}

.chat {
  display: inline-block;
  vertical-align: top;
  margin: 0;
  margin-left: 20px;
}

.name {
  color: gray;
  font-size: 12px;
  margin: 0;
}

.baloon {
  display: inline-block;
  background-color: $baloon-color;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  // reflect line breaks
  white-space: pre-wrap;
  word-wrap: break-word;
}

.baloon::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 3px;
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid $baloon-color;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
}
</style>
