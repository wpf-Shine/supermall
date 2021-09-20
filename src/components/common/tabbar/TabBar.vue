<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  components: {},
};
</script>

<style>
#tab-bar {
  position: fixed;
  display: flex;
  right: 0;
  left: 0;
  bottom: 0;
  height: 49px;
  background-color: #f6f6f6;
}
</style>