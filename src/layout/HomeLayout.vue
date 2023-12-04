<script setup lang="ts">

const data = reactive([
  {
    title: '案例列表',
    index: '/list',
    content: '案例列表'
  }
])

const router = useRouter()

function toHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <el-container>
    <el-header>
      <el-menu
        background-color="var(--el-color-primary)"
        text-color="white"
        active-text-color="black"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item @click="toHome">司法类案检索系统</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="13%">
        <el-menu
          default-active="/list"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
        >
          <SubMenu :subMenuList="data"></SubMenu>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-header {
  padding: 0;
}
</style>