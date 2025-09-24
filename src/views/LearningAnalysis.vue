<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-base-content">学情分析</h1>
        <p class="text-base-content/60 mt-1">深入了解学生学习情况，优化教学策略</p>
      </div>
      <button class="btn btn-soft" @click="openUploadModal">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        制作报告
      </button>
    </div>

    <!-- 文件上传 Modal -->
    <dialog class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box">
        <h3 class="font-bold text-lg">上传学生成绩 Excel</h3>
        <p class="py-4">请选择一个 .xls 或 .xlsx 文件进行上传。文件应至少包含两列：学生姓名和分数。</p>
        
        <div class="form-control w-full">
          <input type="file" ref="fileInput" class="file-input file-input-bordered w-full" accept=".xls,.xlsx" />
        </div>

        <div v-if="errorMessage" class="alert alert-error mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ errorMessage }}</span>
        </div>

        <div class="modal-action">
          <button class="btn" @click="closeUploadModal" :disabled="isLoading">取消</button>
          <button class="btn btn-primary" @click="handleFileUpload" :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-spinner"></span>
            {{ isLoading ? '正在解析...' : '开始分析' }}
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeUploadModal">close</button>
      </form>
    </dialog>


    <!-- 已保存的报告列表 -->
    <div v-if="savedReports.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="report in savedReports" :key="report.id" class="card bg-white hover:shadow-2xl transition-shadow duration-300">
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
      <svg class="w-16 h-16 mx-auto mb-4 text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-base-content/60 text-lg mb-2">暂无已保存的报告</p>
      <p class="text-base-content/40">点击上方"制作报告"按钮开始分析</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

const router = useRouter();
const isModalOpen = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const errorMessage = ref('');

interface Report {
  id: number;
  title: string;
  date: string;
  studentCount: number;
}

// 模拟已保存的报告数据
const savedReports = ref<Report[]>([
  { id: 1, title: '高一（3）班期中数学成绩分析', date: '2025-09-23', studentCount: 45 },
  { id: 2, title: '初二（1）班单元测验（物理）', date: '2025-09-20', studentCount: 52 },
  { id: 3, title: '小学五年级英语期末模拟考', date: '2025-09-18', studentCount: 38 },
]);

const openUploadModal = () => {
  errorMessage.value = '';
  isModalOpen.value = true;
};

const closeUploadModal = () => {
  isModalOpen.value = false;
};

const viewReport = (id: number) => {
  // 跳转到报告详情页面，标记为查看已存在的报告
  console.log(`查看报告 ID: ${id}`);
  router.push({ name: 'AnalysisResult', query: { existing: 'true', id: id.toString() } });
};

const handleFileUpload = async () => {
  if (!fileInput.value?.files?.length) {
    errorMessage.value = '请选择一个文件。';
    return;
  }

  const file = fileInput.value.files[0];
  const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = '文件格式不正确，请上传 .xls 或 .xlsx 文件。';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as { [key: string]: any }[];

    if (jsonData.length === 0) {
      throw new Error('Excel 文件为空或格式不正确。');
    }

    // 假设第一列是学生名，第二列是分数
    const headers = Object.keys(jsonData[0]);
    const students = jsonData.map(row => row[headers[0]]);
    const scores = jsonData.map(row => row[headers[1]]);

    // 跳转到结果页并传递数据
    router.push({ 
      name: 'AnalysisResult', 
      state: { 
        analysisData: { students, scores } 
      } 
    });

    closeUploadModal();
  } catch (error) {
    errorMessage.value = `解析失败: ${(error as Error).message}`;
  } finally {
    isLoading.value = false;
  }
};
</script>
