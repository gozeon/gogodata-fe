<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <h1 style="text-align: center">Sinking</h1>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="form.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            show-password
            v-model="form.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          :disabled="!(form.user && form.password)"
          @click="handleLogin"
          >登录</el-button
        >
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const authModule = namespace('auth')

@Component
export default class Login extends Vue {
  form = {
    user: 'admin',
    password: 'admin',
  }
  @authModule.Action('login') token: any

  loading = false

  async handleLogin() {
    try {
      this.loading = true
      await this.token(this.form)
      if (this.$route.query?.nextUrl != null) {
        this.$router.push(String(this.$route.query.nextUrl))
      } else {
        this.$router.push({
          name: 'Home',
        })
      }
      this.loading = false
    } catch (e) {
      this.loading = false
      this.$message.error(e.response?.data?.message || e.message)
    }
  }

  mounted() {
    localStorage.clear()
  }
}
</script>
