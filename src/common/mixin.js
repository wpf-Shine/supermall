import { debounce } from "./utils";

import BackTop from "components/content/backTop/BackTop";

export const itemListtenerMixin = {
  data() {
    return {
      ItemImgListener: null,
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 50);
    this.ItemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.ItemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
  },
}