<template>
  <div class="board">
    <slot></slot>
  </div>
</template>
<style lang="less">
.board {
  background-color: #fff;
  border-radius: 0.2rem;
  width: 7.1rem;
  margin: 0.2rem;
}
</style>

<script>
export default {
  name: "empty-board",
};
</script>