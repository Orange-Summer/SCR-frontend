<script setup lang="ts">

const router = useRouter()

function toList() {
  router.push({
    name: 'list'
  })
}
</script>

<template>
  <div id="building">
    <el-row justify="center" align="middle" style="height: 90%">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>司法类案检索系统</span>
            </div>
          </template>
          <el-button
            plain
            size="large"
            style="font-size: 25px; background-color: transparent"
            @click="toList"
            >进入</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
#building {
  background: url('@/assets/images/law.jpg');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.box-card {
  text-align: center;
  font-size: 30px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>