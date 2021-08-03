<template>
  <el-aside :width="currentWidth">
    <router-link to="/" tag="h3" class="pointer">{{ name }}</router-link>
    <el-menu
      router
      :default-active="$route.name"
      :collapse="menuConfig.collapse"
    >
      <el-menu-item
        v-for="item in menuConfig.menus"
        :key="item.icon"
        :index="item.route.name"
        :route="item.route"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const appModule = namespace('app')

@Component
export default class Sidebar extends Vue {
  @appModule.State('menuConfig') menuConfig: any
  @appModule.State('name') name: any

  get currentWidth() {
    return this.menuConfig.collapse ? '64px' : '200px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  text-align: center;
}
</style>
