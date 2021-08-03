<template>
  <div class="home">
    <el-container>
      <el-main sticky-container>
        <h1 class="title">{{ name }}</h1>
        <el-row class="bg-base" type="flex" justify="center" v-sticky>
          <el-col :md="10" :sm="24">
            <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              v-model="search"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :md="2" :sm="24" class="button-group">
            <new-group @create-success="handleSearch" />
          </el-col>
        </el-row>

        <el-row
          v-loading="searchLoading"
          class="mt-2r"
          type="flex"
          justify="center"
        >
          <el-col :md="12" :sm="24">
            <template v-for="item in groupList">
              <el-card :key="item.ID" shadow="hover" class="mb-10">
                <div slot="header" class="clearfix">
                  <span class="text">{{ item.Name }}</span>

                  <el-tooltip content="删除" placement="top">
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      icon="el-icon-delete"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="编辑" placement="top">
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      icon="el-icon-edit-outline"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip content="数据" placement="top">
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      icon="el-icon-data-board"
                    ></el-button>
                  </el-tooltip>
                </div>
                <div class="text">{{ getGroupDescription(item) }}</div>
              </el-card>
            </template>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sticky from 'vue-sticky-directive'

import { namespace } from 'vuex-class'
import NewGroup from '../components/NewGroup.vue'

const appModule = namespace('app')
const groupModule = namespace('group')
@Component({
  components: { NewGroup },
  directives: {
    Sticky,
  },
})
export default class Home extends Vue {
  @appModule.State('name') name: any
  @groupModule.State('list') groupList: any
  @groupModule.Action('list') getGroupList: any
  search = ''
  searchLoading = false

  mounted() {
    this.handleSearch()
  }

  async handleSearch() {
    this.searchLoading = true
    await this.getGroupList({ search: this.search })
    this.searchLoading = false
  }

  getGroupDescription(group: any) {
    return group.Description ?? '暂无描述'
  }
}
</script>
<style scoped lang="scss">
.home {
  .title {
    text-align: center;
  }

  .button-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .el-card {
    .el-card__header {
      span {
        font-weight: bold;
        color: #2c3e50;
      }
    }
    .text {
      color: #606266;
    }
  }
}
</style>
