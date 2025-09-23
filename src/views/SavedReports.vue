<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-base-content">已保存的学情报告</h1>
      <button class="btn btn-ghost" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
        返回
      </button>
    </div>

    <!-- 报告列表 -->
    <div v-if="reports.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="report in reports" :key="report.id" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div class="card-body">
          <h2 class="card-title">{{ report.title }}</h2>
          <p class="text-sm text-base-content/60">生成日期: {{ report.date }}</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="badge badge-outline">{{ report.studentCount }} 名学生</div>
            <button class="btn btn-primary btn-sm" @click="viewReport(report.id)">查看详情</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-16">
      <p class="text-base-content/60">暂无已保存的报告。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Report {
  id: number;
  title: string;
  date: string;
  studentCount: number;
}

// 使用模拟数据
const reports = ref<Report[]>([
  { id: 1, title: '高一（3）班期中数学成绩分析', date: '2025-09-23', studentCount: 45 },
  { id: 2, title: '初二（1）班单元测验（物理）', date: '2025-09-20', studentCount: 52 },
  { id: 3, title: '小学五年级英语期末模拟考', date: '2025-09-18', studentCount: 38 },
]);

const viewReport = (id: number) => {
  // 在实际应用中，这里会跳转到报告的详细页面
  // 为了演示，我们暂时只做打印
  console.log(`查看报告 ID: ${id}`);
  // 假设我们重用 AnalysisResult 页面来显示详情
  router.push({ name: 'AnalysisResult' });
};

const goBack = () => {
  router.push({ name: 'LearningAnalysis' });
};
</script>

<style scoped>
/* 可以在此添加自定义样式 */
</style>
