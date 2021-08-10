<template>
  <el-row :gutter="10" type="flex" align="center" justify="center">
    <el-col :md="16">
      <h1 v-if="groupData">{{ groupData.Name }}</h1>
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
              size="small"
              @click="
                activeDictGroup = scope.row
                drawer = true
              "
            >
              详情
            </el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" type="text" size="small"
                >删除</el-button
              >
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

const groupModule = namespace('group')
const dsModule = namespace('datasource')

@Component({
  // components: { NewGroup, EditGroup },
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
  loading = false

  get groupData() {
    return this.getInfoById(this.$route.params.groupID)
  }

  async mounted() {
    try {
      this.loading = true
      await this.infoGroupById({ id: this.$route.params.groupID })
      await this.getListDataSource({ groupId: this.$route.params.groupID })
      this.loading = false
    } catch (e) {
      this.$message.error(e.response.data.message)
    }
  }

  dateFormat(row: any, column: any, cellValue: any, index: any) {
    return format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss')
  }
}
</script>
