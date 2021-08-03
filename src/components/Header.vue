<template>
  <el-row type="flex" justify="space-between" align="middle" class="h-full">
    <i :class="CurrentIcon" @click="menuToggleCollapse"></i>

    <el-dropdown>
      <span class="pointer">{{ username }}</span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link
            :to="{ name: 'Login', query: { nextUrl: $route.fullPath } }"
            tag="div"
            class="pointer"
            >退出</router-link
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const appModule = namespace('app')
const authModule = namespace('auth')

@Component
export default class Header extends Vue {
  @authModule.State('username') username: any
  @appModule.State('menuConfig') menuConfig: any
  @appModule.Mutation('menuToggleCollapse') menuToggleCollapse: any

  get CurrentIcon() {
    return this.menuConfig.collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
