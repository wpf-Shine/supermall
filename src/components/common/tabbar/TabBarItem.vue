<template>
  <div class="tab-bar-item" @click="itemclick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemclick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  font-size: 12px;
  text-align: center;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 4px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>