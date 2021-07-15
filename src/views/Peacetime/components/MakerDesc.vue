<template>
  <div class="icon_desc_wrap">
    <div class="icon_desc_row" :key="item.name" v-for="item in imgArr">
      <img class="icon_img cursor-pointer" @click="filterMapType(item.name,item.type)" :src="item.url" alt="" />
      <div class="icon_name">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current:'all',
      ind:0,
      imgArr: [
        // { url: require('../../../assets/IC/maker1_gif.webp'), name: 'Ⅰ级', type:1 },
        // { url: require('../../../assets/IC/maker2_gif.webp'), name: 'Ⅱ级', type:2 },
        // { url: require('../../../assets/IC/maker3_gif.webp'), name: 'Ⅲ级', type:3 },
        // { url: require('../../../assets/IC/maker4_gif.webp'), name: 'Ⅳ级', type:4 }
           { url: require('../../../assets/IC/maker1.png'), name: 'Ⅰ级', type:1 },
        { url: require('../../../assets/IC/maker2.png'), name: 'Ⅱ级', type:2 },
        { url: require('../../../assets/IC/maker3.png'), name: 'Ⅲ级', type:3 },
        { url: require('../../../assets/IC/maker4.png'), name: 'Ⅳ级', type:4 }
      ]
    }
  },
  methods:{
    filterMapType(val,type){
      if(type != this.current){
        this.current = type
        this.ind = 0
      }
      let obj = {
        val:val, ind:this.ind++
      }
      this.$emit('filterMap', obj)
    }
  }
}
</script>
<style lang="less" scoped>
.icon_desc_wrap {
  text-align: right;
  .icon_desc_row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .icon_img {
    width: 65px;
    height: 75px;
    margin-right:10px;
  }
}
</style>
