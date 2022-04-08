<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="xurl"></use>
  </svg>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: ["xurl"],
})
export default class Icon extends Vue {}
</script>

<style lang="less">
.icon {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: inherit;
}
</style>