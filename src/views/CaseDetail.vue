<script setup lang="ts">
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

// 加载数据
function loadData(id: string) {
  getCaseById(id).then((res) => {
    detail.value.case_no = res.data.case_no
    detail.value.crime = res.data.crime
    detail.value.id = res.data.id
    detail.value.title = res.data.title
    detail.value.content = ''
    const contentList = res.data.content
    for (let i = 0; i < contentList.length; i++) {
      detail.value.content += contentList[i].sentence
      detail.value.content += '。'
    }
  })
}

interface Detail2 {
  _id: string
  crime: string
  content: string
}

interface SimilarDetail {
  targetId: string
  similarity: number
  bill: Detail2
}

let SCList = ref<SimilarDetail[]>([])

function loadSimilarCaseList(id: string) {
  getSimilarCase(id).then((res) => {
    SCList.value = res.resultUnits
    // console.log(res.resultUnits)
  })
}

// 格式化相似度
function similarFormat(row: any, column: any) {
  return (row[column.property] * 100).toFixed(2) + '%'
}

// 监控 route id 重新加载数据
const idChange = watchEffect(() => {
  loadData(route.params.id as string)
  loadSimilarCaseList(route.params.id as string)
})
// 退出路由时注销 watch
onBeforeRouteLeave(() => {
  idChange()
})

// 跳转其它案例详情
function toCase(index: number) {
  const id = SCList.value[index].bill['_id']
  router.push({
    name: 'case',
    params: { id: id }
  })
}
</script>

<template>
  <el-row>
    <el-col>
      <el-descriptions title="案例详情" :border="true" size="large" :column="2">
        <el-descriptions-item label="案件号">{{ detail.case_no }}</el-descriptions-item>
        <el-descriptions-item label="标题">{{ detail.title }}</el-descriptions-item>
        <el-descriptions-item label="罪名">{{ detail.crime }}</el-descriptions-item>
        <el-descriptions-item label="编号">{{ detail.id }}</el-descriptions-item>
        <el-descriptions-item label="内容" width="80">{{ detail.content }}</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-card shadow="hover">
        <template #header>
          <el-row justify="center" style="margin: 0 0">
            <span style="font-size: x-large">相似案例</span>
          </el-row>
        </template>
        <el-table :data="SCList" stripe table-layout="auto">
          <el-table-column prop="bill._id" label="编号" width="400" />
          <el-table-column prop="bill.crime" label="罪名" />
          <el-table-column prop="similarity" label="相似度" :formatter="similarFormat" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="toCase(scope.$index)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped></style>