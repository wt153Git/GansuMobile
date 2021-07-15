<template>
  <div>
    <div
      v-for="(item, ind) in list"
      :key="ind"
      @click="addMarker"
      class="flex-space-between list_row"
      :class="ind === activedInd ? 'actived' : ''"
    >
      <div @click="toItem(item, ind)" class="row_icon_name">
        <el-icon
          class="el-icon-location font-size-18 margin-right-10 cursor-pointer"
        ></el-icon>
        <span class="cursor-pointer" style="color:#51aafe">
          {{ item.name }}
        </span>
      </div>
      <div v-if="item.val" style="color:#dcdcdc">
        {{ item.positionLabel }}：{{ item.val }}
      </div>
    </div>
    <el-pagination
      v-show="total > 0"
      class="my_list_pagination align-center"
      :background="false"
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="currentChange"
      @prev-click="preClick"
      @next-click="nextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getKeyByCategory } from '@/utils'
export default {
  props: {
    querykey: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 9
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      activedInd: ''
    }
  },
  watch: {
    page(val) {
      this.currentPage = val
    },
    list: {
      handler(val) {
        this.handlerData(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getKeyByCategory,
    toItem(item, ind) {
      this.$emit('toItem', item)
      this.activedInd = ind
    },
    addMarker(item) {
      this.$emit('clickRow', item)
    },
    currentChange(val) {
      this.$emit('page', val)
    },
    preClick(val) {
      this.$emit('page', val)
    },
    nextClick(val) {
      this.$emit('page', val)
    },
    handlerData() {
      this.activedInd = ''
      this.list.forEach(item => {
        let key = item.index ? item.index.split('_data')[0] : ''
        let showKey = this.getKeyByCategory(this.querykey || key)
        if (showKey.nameKey != 'name') {
          item.name = item[showKey.nameKey]
        }
        item.val = showKey.valkey ? item[showKey.valkey] : ''
        item.positionLabel = showKey.position
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list_row {
  font-size: 14px;
  background: #030d18;
  padding: 13px 14px;
  margin-bottom: 5px;
  &.actived {
    background: rgb(20, 39, 75);
  }
  .row_icon_name {
    display: flex;
    justify-content: center;
  }
}
</style>
