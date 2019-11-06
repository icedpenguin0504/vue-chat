<template>
  <div class="list">
    <div class="baloon">{{ $props.message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'chat',
    props: {
      'message': {
        type: String
      }
    }
  }
</script>

<style lang="scss">
$baloon-color: lightgray;

.list {
  margin-top: 10px;
}

.baloon {
  display: inline-block;
  background-color: $baloon-color;
  border-radius: 10px;
  padding: 10px;
  // reflect line breaks
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
