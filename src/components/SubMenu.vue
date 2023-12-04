<script setup lang="ts">
defineProps(['subMenuList']);
</script>

<template>
  <template v-for="(item, index) in subMenuList">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :key="index + 'el-submenu'"
      :index="item.index"
    >
      <template #title>
        <span>{{ item.content }}</span>
      </template>
      <SubMenu :subMenuList="item.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      :key="item.title"
      :title="item.title"
      :index="item.index"
    >
      {{ item.content }}
    </el-menu-item>
  </template>
</template>

<style scoped></style>
