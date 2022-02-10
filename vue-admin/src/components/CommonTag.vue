<template>
    <div class="tag">
        <el-tag
            size="small" v-for="(tag,index) in tags" :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag,index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu (tag) {
      this.$router.push({
        name: tag.name
      })
    },
    handleClose (tag, index) {
      const length = this.tags.length - 1
      this.close(tag)
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tag {
    padding: 20px;
    text-align: left;
    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
}
</style>
