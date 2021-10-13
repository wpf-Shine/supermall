<template>
  <div>
    <nav-bar>
      <div slot="nav-left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="nav-center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="titleitem"
          :class="{ active: index == currentIndex }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
  
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>
  
<style scpoed>
.title {
  display: flex;
  font-size: 13px;
}
.titleitem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 11px;
}
</style>