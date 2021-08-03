<template>
  <div class="new-group">
    <el-button type="primary" @click="dialogVisible = true">新建</el-button>
    <el-dialog title="新建组" :visible.sync="dialogVisible" append-to-body>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.Name" />
        </el-form-item>
        <el-form-item label="描述" prop="Description">
          <el-input v-model="form.Description" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const groupModule = namespace('group')

@Component
export default class NewGroup extends Vue {
  @groupModule.Action('create') createGroup: any
  dialogVisible = false
  form = {}
  rules = {
    Name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 - 10 个字符', trigger: 'blur' },
    ],
  }

  handleSubmit() {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        try {
          await this.createGroup(this.form)
          this.form = {}
          this.dialogVisible = false
          this.$message.success('创建成功')

          this.$emit('create-success')
        } catch (e) {
          this.$message.error(e.response.data.message)
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.new-group {
  //display: inline;
}
</style>
