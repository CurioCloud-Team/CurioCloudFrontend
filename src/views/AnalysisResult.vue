<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8">
    <!-- 添加返回按钮 -->
    <div class="flex items-center mb-6">
      <button class="btn btn-ghost" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
        返回学情分析
      </button>
    </div>
    
    <div class="card bg-white">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">学情分析报告</h2>

        <!-- 分析结果摘要 -->
        <div class="stats bg-gray-100 mb-6">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="stat-title">平均分</div>
            <div class="stat-value">85.4</div>
            <div class="stat-desc">比上次提升 5%</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            <div class="stat-title">优秀率</div>
            <div class="stat-value">76%</div>
            <div class="stat-desc">21 人优秀</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div class="stat-title">需关注学生</div>
            <div class="stat-value">5 人</div>
            <div class="stat-desc">知识点掌握薄弱</div>
          </div>
        </div>

        <!-- ECharts 图表容器 -->
        <div class="w-full h-96" ref="chartContainer"></div>

        <!-- AI 智能分析 -->
        <div class="mt-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold">AI 智能分析</h3>
            <button 
              class="btn btn-outline btn-sm" 
              @click="generateAIAnalysis" 
              :disabled="isAnalyzing"
            >
              <svg v-if="isAnalyzing" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              {{ isAnalyzing ? '分析中...' : '生成AI分析' }}
            </button>
          </div>

          <div v-if="aiAnalysisResult" class="space-y-6">
            <!-- 预备知识掌握情况推断 -->
            <div class="card bg-blue-50 ">
              <div class="card-body">
                <h4 class="card-title text-blue-800">

                  预备知识掌握情况推断
                </h4>
                <p class="text-gray-700 leading-relaxed">{{ aiAnalysisResult.knowledgeAssessment }}</p>
              </div>
            </div>

            <!-- 教学建议 -->
            <div class="card bg-green-50 ">
              <div class="card-body">
                <h4 class="card-title text-green-800">

                  教学建议
                </h4>
                <div class="text-gray-700">
                  <div v-for="(suggestion, index) in aiAnalysisResult.teachingSuggestions" :key="index" class="mb-2 last:mb-0">
                    <span class="font-medium">{{ index + 1 }}. </span>{{ suggestion }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="!isAnalyzing" class="text-center py-8 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <p>点击上方按钮生成 AI 智能分析</p>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="card-actions justify-end mt-6" v-if="!isViewingExistingReport">
          <button class="btn" @click="handleDiscard">舍弃结果</button>
          <button class="btn btn-primary" @click="handleSave">保存报告</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

// 注册 ECharts 组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

const router = useRouter();
const route = useRoute();
const chartContainer = ref<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

// 判断是否正在查看已存在的报告
const isViewingExistingReport = computed(() => {
  return route.query.existing === 'true';
});

// AI 分析相关状态
const isAnalyzing = ref(false);
const aiAnalysisResult = ref<{
  knowledgeAssessment: string;
  teachingSuggestions: string[];
} | null>(null);

// 模拟从路由状态获取的数据
const analysisData = history.state.analysisData || {
  // 默认模拟数据
  scores: [88, 92, 76, 85, 95, 79, 81, 90, 68, 84],
  students: ['小明', '小红', '小刚', '小丽', '小华', '小强', '小美', '小军', '小芸', '小伟'],
};

const chartOption: EChartsOption = {
  title: {
    text: '学生成绩分布',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['分数'],
    top: 'bottom',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: analysisData.students,
    axisLabel: {
      interval: 0,
      rotate: 30,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '分数',
      type: 'bar',
      data: analysisData.scores,
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
  ],
};

onMounted(() => {
  if (chartContainer.value) {
    chartInstance.value = echarts.init(chartContainer.value);
    chartInstance.value.setOption(chartOption);
  }
});

// 生成关键数据分析摘要
const generateAnalysisData = () => {
  const scores = analysisData.scores as number[];
  const students = analysisData.students as string[];
  
  // 计算关键指标
  const totalStudents = scores.length;
  const averageScore = scores.reduce((sum: number, score: number) => sum + score, 0) / totalStudents;
  const failingStudents = students.filter((_: string, index: number) => scores[index] < 60);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  
  // 模拟知识点错误率数据
  const knowledgePoints = [
    { name: '函数与方程', errorRate: 25 },
    { name: '数列', errorRate: 35 },
    { name: '三角函数', errorRate: 20 },
    { name: '立体几何', errorRate: 40 },
  ];
  
  return {
    totalStudents,
    averageScore: Math.round(averageScore * 100) / 100,
    failingStudents,
    maxScore,
    minScore,
    knowledgePoints
  };
};

// 模拟调用 Gemini AI 分析
const callGeminiAnalysis = async (analysisData: any) => {
  // 这里应该调用实际的 Gemini API
  // 为了演示，我们使用模拟数据
  return new Promise<{
    knowledgeAssessment: string;
    teachingSuggestions: string[];
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        knowledgeAssessment: `根据本次测试结果分析，班级平均分为${analysisData.averageScore}分，整体水平良好。${analysisData.failingStudents.length > 0 ? `有${analysisData.failingStudents.length}名学生未达到及格线，主要集中在${analysisData.knowledgePoints.filter((kp: any) => kp.errorRate > 30).map((kp: any) => kp.name).join('、')}等知识点上。` : '全班同学均达到及格标准。'}从错误分布来看，立体几何和数列部分的掌握情况相对薄弱，预备知识可能存在空白，建议重点关注空间想象能力和逻辑推理能力的培养。`,
        teachingSuggestions: [
          '针对立体几何薄弱的学生，建议加强空间几何体的直观教学，使用模型和多媒体辅助',
          '数列知识点建议从基础的等差、等比数列开始复习，逐步过渡到综合应用',
          '对于未及格学生，建议进行个别辅导，重点补习基础概念和计算技能',
          '可以设计分层作业，让不同水平的学生都能得到适当的练习',
          '建议增加课堂互动和小组讨论，提高学生的参与度和理解深度'
        ]
      });
    }, 2000); // 模拟 2 秒的 API 调用时间
  });
};

// 生成 AI 分析
const generateAIAnalysis = async () => {
  if (isAnalyzing.value) return;
  
  isAnalyzing.value = true;
  try {
    const keyData = generateAnalysisData();
    const result = await callGeminiAnalysis(keyData);
    aiAnalysisResult.value = result;
  } catch (error) {
    console.error('AI 分析失败:', error);
    // 这里可以添加错误处理 UI
  } finally {
    isAnalyzing.value = false;
  }
};

const goBack = () => {
  router.push({ name: 'LearningAnalysis' });
};

const handleSave = () => {
  // 此处可以添加保存逻辑，例如调用 API
  console.log('报告已保存');
  router.push({ name: 'LearningAnalysis' });
};

const handleDiscard = () => {
  router.push({ name: 'LearningAnalysis' });
};
</script>

<style scoped>
/* 你可以在这里添加一些微调样式，但优先使用 Tailwind 和 daisyUI */
</style>
