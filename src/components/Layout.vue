<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

@Component({
  components: {
    Sidebar,
    Header,
  },
})
@Component
export default class Layout extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
