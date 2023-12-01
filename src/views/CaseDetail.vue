<template>
  <el-row>
    <el-descriptions title="案例详情" :border="true" size="large" column="4">
      <el-descriptions-item label="判决号">{{ detail.case_no }}</el-descriptions-item>
      <el-descriptions-item label="标题">{{ detail.title }}</el-descriptions-item>
      <el-descriptions-item label="罪名">{{ detail.crime }}</el-descriptions-item>
      <el-descriptions-item label="案件号">{{ detail.id }}</el-descriptions-item>
      <el-descriptions-item label="内容" width="80">{{ detail.content }}</el-descriptions-item>
    </el-descriptions>
  </el-row>
  <el-row>
    <el-card>
      <template #header>
        <el-row justify="center" style="margin: 0 0">
          <span style="font-size: x-large">相似案例</span>
        </el-row>
      </template>
      <el-table :data="SCList" stripe table-layout="auto">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="crime" label="罪名" />
        <el-table-column prop="id" label="案件号" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="toCase(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { getCaseById, getSimilarCase } from '@/api/bill'

const router = useRouter()
const route = useRoute()

interface Detail {
  case_no: string
  title: string
  crime: string
  id: string
  content: string
}

let detail = ref<Detail>({ content: '', case_no: '', crime: '', id: '', title: '' })

let SCList = ref<Detail[]>([])

function calculateContent() {}

// 加载数据
function loadData(id: string) {
  getCaseById(id).then((res) => {
    detail.value = res.data
  })
}

function loadSimilarCaseList(id: string) {
  getSimilarCase(id).then((res) => {
    SCList.value = res.data
  })
}

// 监控 route id 重新加载数据
const idChange = watchEffect(() => {
  loadData(route.params.id as string)
  // loadSimilarCaseList(route.params.id as string)
})
// 退出路由时注销 watch
onBeforeRouteLeave(() => {
  idChange()
})

// 双击树图节点跳转
function toCase(index: number) {
  const id = SCList.value[index]['id']
  router.push({
    name: 'case',
    params: { id: id }
  })
}
</script>

<style scoped></style>