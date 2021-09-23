<template>
  <div id="home">
    <nav-bar class="nav-home">
      <div slot="nav-center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommonend-view :recommends="recommends"></recommonend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommonendView from "./childComps/RecommendView";
import { getHomeMultidata } from "api/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommonendView,
  },
  created() {
    // 请求多个数据
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.nav-home {
  background-color: var(--color-tint);
  color: #fff;
}
</style>