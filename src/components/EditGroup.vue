<template>
  <el-dialog title="修改" :visible.sync="dialogVisible" append-to-body>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="ID" prop="ID">
        <el-input v-model="form.ID" disabled />
      </el-form-item>
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
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const groupModule = namespace('group')

@Component
export default class EditGroup extends Vue {
  @groupModule.Action('update') updateGroup: any
  @Prop({ required: true }) readonly defaultForm!: any
  dialogVisible = false
  form = {}
  rules = {
    Name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 - 10 个字符', trigger: 'blur' },
    ],
  }

  @Watch('defaultForm', { immediate: true })
  onChildChanged(val: any, oldVal: any) {
    this.form = { ...val }
  }

  show() {
    this.dialogVisible = true
  }

  handleSubmit() {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        try {
          await this.updateGroup(this.form)
          this.form = {}
          this.dialogVisible = false
          this.$message.success('修改成功')

          this.$emit('edit-success')
        } catch (e) {
          this.$message.error(e.response.data.message)
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
