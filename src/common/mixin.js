import { debounce } from "./utils";
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