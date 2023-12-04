<script setup lang="ts">
import { getCaseById, getCaseList } from '@/api/bill'

const listData = reactive({
  data: []
})

const pageData = reactive({
  // 分页组件中的页数从 1 开始
  currPage: 1,
  pageSize: 20,
  total: 8000
})

//加载页面数据
function loadList(page: number, size: number) {
  getCaseList({ page, size }).then((res) => {
    pageData.total = res.data.totalElements
    listData.data = res.data.content
    // console.log(listData);
  })
}

onMounted(() => {
  watchEffect(() => {
    const truePage = pageData.currPage - 1
    loadList(truePage, pageData.pageSize)
  })
})

//计算条目真实序号
const indexMethod = (index: number) => {
  return index + (pageData.currPage - 1) * pageData.pageSize + 1
}

// 跳转其他人详情界面
const router = useRouter()

function toCase(index: number) {
  const id = listData.data[index]['id']
  router.push({
    name: 'case',
    params: { id: id }
  })
}

let searchInput = ref<string>('')

function toCase2(id: string) {
  getCaseById(id).then((res) => {
    if (res.data != null) {
      router.push({
        name: 'case',
        params: { id: id }
      })
    } else {
      ElMessage.error('不存在该案例')
    }
  })
  // const id = listData.data[index]['id']
}
</script>

<template>
  <el-row style="">
    <el-page-header>
      <template #content>
        <span>案件列表</span>
      </template>
    </el-page-header>
  </el-row>
  <el-row>
    <!-- span指定列的宽度 -->
    <el-col :span="6">
      <!-- 搜索框 -->
      <!-- 通过v-model做数据绑定 -->
      <el-input
        placeholder="请输入要搜索案例的编号"
        class="input-with-select"
        v-model="searchInput"
      ></el-input>
    </el-col>
    <!-- 查询、新增按钮 -->
    <el-col :span="3" :offset="1">
      <el-button type="primary" @click="toCase2(searchInput)">查询</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-pagination
        v-model:current-page="pageData.currPage"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[20, 50, 100, 1000]"
        :pager-count="9"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
        :default-current-page="1"
        :default-page-size="20"
        hide-on-single-page
      />
    </el-col>
  </el-row>
  <el-row>
    <!-- table表格 -->
    <!-- 表格数据绑定和默认宽度 -->
    <el-table :data="listData.data" stripe table-layout="auto" style="width: 100%">
      <!-- 每一个列，prop为主键，label为文案 -->
      <!-- 索引 -->
      <el-table-column type="index" :index="indexMethod" width="80"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="crime" label="罪名"></el-table-column>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="scope">
          <el-button size="small" @click="toCase(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<style scoped></style>