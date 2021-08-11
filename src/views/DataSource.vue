<template>
  <el-row
    :gutter="10"
    type="flex"
    align="center"
    justify="center"
    v-if="groupData"
  >
    <el-col :md="16">
      <h1>{{ groupData.Name }}</h1>

      <el-row>
        <new-datasource @create-success="handleSearch"></new-datasource>
      </el-row>

      <el-table :data="listDataSource" style="width: 100%" v-loading="loading">
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="Name" label="名字"></el-table-column>
        <el-table-column prop="Description" label="描述"></el-table-column>
        <el-table-column
          prop="CreatedAt"
          label="创建时间"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="UpdatedAt"
          label="修改时间"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-link"
              v-clipboard:copy="copyMessage(scope.row)"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
            </el-button>
            <el-button
              type="text"
              icon="el-icon-edit-outline"
              @click="
                $router.push({
                  name: 'DataSource.edit',
                  params: { dsID: scope.row.ID },
                })
              "
            >
            </el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button
                slot="reference"
                type="text"
                icon="el-icon-delete"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sticky from 'vue-sticky-directive'
import { namespace } from 'vuex-class'
import { format } from 'date-fns'

import NewDatasource from '../components/NewDatasource.vue'

const groupModule = namespace('group')
const dsModule = namespace('datasource')

@Component({
  components: { NewDatasource },
  directives: {
    Sticky,
  },
})
export default class DataSource extends Vue {
  @groupModule.State('info') groupInfo: any
  @groupModule.Getter('getInfoById') getInfoById: any
  @groupModule.Action('info') infoGroupById: any
  @dsModule.State('list') listDataSource: any
  @dsModule.Action('list') getListDataSource: any
  @dsModule.Action('del') delDataSource: any
  loading = false
  activeDS = {}

  get groupData() {
    return this.getInfoById(this.$route.params.groupID)
  }

  async mounted() {
    try {
      await this.infoGroupById({ id: this.$route.params.groupID })
      await this.handleSearch()
    } catch (e) {
      this.$message.error(e.response.data.message)
    }
  }

  async handleSearch() {
    this.loading = true
    await this.getListDataSource({ groupId: this.$route.params.groupID })
    this.loading = false
  }

  async handleDelete(ds: any) {
    try {
      await this.delDataSource(ds)
      this.$message.success('删除成功')
      this.handleSearch()
    } catch (e) {
      this.$message.error(e.response.data.message)
    }
  }

  copyMessage(ds: any) {
    return `${import.meta.env.VITE_API_BASE}/gogodata/ds/info/${ds?.ID}`
  }

  onCopy() {
    this.$message.success('复制成功')
  }

  onError() {
    this.$message.error('复制成功')
  }

  dateFormat(row: any, column: any, cellValue: any, index: any) {
    return format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss')
  }
}
</script>
