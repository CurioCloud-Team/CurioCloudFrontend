// src/services/ppt.ts

// PPT相关API (主要通过teaching服务提供)

// 重新导出teaching服务中的PPT相关方法
export {
  generatePPTFromLessonPlanAPI,
  getPPTStatusAPI,
  getPPTSlidesAPI,
  exportPPTFileAPI
} from './teaching'

// PPT专用服务可以在这里扩展
// 例如：获取用户PPT项目列表、管理PPT项目等