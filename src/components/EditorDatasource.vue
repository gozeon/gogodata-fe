<template>
  <el-row
    :gutter="10"
    type="flex"
    align="center"
    justify="center"
    v-if="dsData"
  >
    <el-col :md="16">
      <el-form ref="form" :model="dsData" :rules="rules" size="mini">
        <el-form-item label="名称" prop="Name">
          <el-input v-model="dsData.Name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="描述" prop="Description">
          <el-input v-model="dsData.Description" placeholder="描述" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleSave"
            style="margin-bottom: 10px"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
      <v-jsoneditor
        v-model="jsonData"
        height="40vh"
        :options="{ mode: 'code' }"
        ref="editor"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VJsoneditor from 'v-jsoneditor'
import { namespace } from 'vuex-class'

const dsModule = namespace('datasource')

@Component({
  components: {
    VJsoneditor,
  },
})
export default class EditorDatasource extends Vue {
  @dsModule.Action('update') updateDatasource: any
  @dsModule.Action('info') infoDSById: any
  @dsModule.Getter('getInfoById') getInfoById: any

  visible = false
  loading = false

  jsonData = ''
  rules = {
    Name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 - 10 个字符', trigger: 'blur' },
    ],
  }

  get dsData() {
    return this.getInfoById(this.$route.params.dsID)
  }

  async mounted() {
    try {
      await this.infoDSById({ id: this.$route.params.dsID })
      this.jsonData = JSON.parse(this.dsData?.Data || '')
    } catch (e) {
      this.$message.error(e.response.data.message)
    }
  }

  show() {
    this.visible = true
  }

  async handleSave() {
    this.$refs.form.validate(async (valid) => {
      try {
        if (!valid) {
          return
        }
        this.loading = true

        const v = await this.$refs.editor.editor.validate()

        // error
        if (v.length > 0) {
          v.forEach((err: any) => {
            this.$message.error(err?.message)
          })

          this.loading = false
          return
        }

        await this.updateDatasource({
          ...this.dsData,
          Data: JSON.stringify(this.jsonData),
        })

        this.$message.success('保存成功')

        this.loading = false
      } catch (e) {
        this.loading = false
        this.$message.error(e.response.data.message)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
