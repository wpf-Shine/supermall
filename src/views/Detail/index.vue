<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="1" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :goodsParam="goodsParam"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "api/detail";
import { itemListtenerMixin, backTopMixin } from "common/mixin";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [itemListtenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 1000);
    },
    contentScroll(position) {
      let positionY = -position.y;
      let length = this.themeTopY.length;
      this.isShowBackTop = positionY < 1000;
      for (let i = 0; i < length; i++) {
        if (
          (i < length - 1 &&
            this.positionY > this.themeTopY[i] &&
            positionY < this.themeTopY[i + 1]) ||
          (i == length - 1 && positionY > this.themeTopY[i])
        ) {
          console.log(i);
          this.$refs.nav.currentIndex = i;
        }
      }
    },
    addCart() {
      console.log(111);
    },
  },
  created() {
    this.iid = this.$route.params.id;
    //请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //获取商品轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //获取商品详情
      this.detailInfo = data.detailInfo;

      //获取商品参数
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.ItemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px - 58px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>