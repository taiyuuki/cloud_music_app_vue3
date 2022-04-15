<template>
  <input
    :type="type"
    class="input-style"
    :placeholder="placeholder"
    :value="value"
  />
</template>

<style lang="less">
.input-style {
  width: 100%;
  display: block;
  border: 0;
  padding: 0 0.2rem;
  outline: none;
  height: 0.8rem;
  margin: 0.1rem;
}
</style>

<script>
export default {
  name: "l-input",
};
</script>