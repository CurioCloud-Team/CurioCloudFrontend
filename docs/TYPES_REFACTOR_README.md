# 类型定义重构说明

## 📁 项目结构

```
src/
├── types/           # 类型定义
│   ├── index.ts     # 类型导出入口
│   ├── api.ts       # 通用API类型
│   ├── auth.ts      # 认证相关类型
│   ├── teaching.ts  # 教学相关类型
│   ├── exercise.ts  # 练习相关类型
│   └── ppt.ts       # PPT相关类型
├── services/        # API服务
│   ├── index.ts     # 服务导出入口
│   ├── auth.ts      # 认证API
│   ├── teaching.ts  # 教学API
│   ├── exercise.ts  # 练习API
│   └── ppt.ts       # PPT API
└── composables/     # Vue组合式函数
    ├── index.ts     # composable导出入口
    ├── useAuth.ts   # 认证状态管理
    ├── useTeaching.ts # 教学功能
    └── useExercise.ts  # 练习功能
```

## 🎯 重构目标

1. **类型安全**: 为所有API接口提供完整的TypeScript类型定义
2. **模块化**: 将类型定义按功能模块拆分，提高可维护性
3. **重用性**: 类型可以在多个服务和组件中重用
4. **开发体验**: 提供准确的IDE类型提示和自动补全

## 📋 类型模块说明

### 🔐 认证类型 (`auth.ts`)
- `UserLogin` - 用户登录请求
- `UserResponse` - 用户信息响应
- `AuthResponse` - 认证响应
- `UserCreate` - 用户注册
- `UserProfileUpdate` - 资料更新

### 📚 教学类型 (`teaching.ts`)
- `LessonPlan` - 教案完整信息
- `LessonPlanListResponse` - 教案列表项
- `StartConversationRequest/Response` - 备课会话
- `ProcessAnswerRequest/Response` - 问题处理
- `PPTGenerationResponse` - PPT生成响应

### ✏️ 练习类型 (`exercise.ts`)
- `Question` - 问题基础结构
- `Choice` - 选择题选项
- `QuestionType` - 问题类型枚举
- `DifficultyLevel` - 难度等级枚举
- `GenerateMCQRequest` - 生成选择题请求

### 📊 PPT类型 (`ppt.ts`)
- 重新导出teaching中的PPT相关类型
- `PPTExportFormat` - 导出格式类型
- `PPTProjectInfo` - PPT项目信息

## 🚀 使用示例

### 在组件中使用类型
```typescript
import type { LessonPlan, Question } from '@/types'
import { getLessonPlansAPI } from '@/services'

// 类型安全的使用
const plans: LessonPlan[] = await getLessonPlansAPI()
```

### 在composable中使用
```typescript
import { useTeaching, useExercise } from '@/composables'

const { fetchLessonPlans, startTeachingSession } = useTeaching()
const { generateMCQs } = useExercise()
```

## ✅ 重构优势

1. **类型安全**: 所有API调用都有完整的类型检查
2. **代码提示**: IDE提供准确的自动补全和错误提示
3. **维护性**: 类型定义集中管理，修改一处影响全局
4. **可扩展**: 新功能可以轻松添加相应的类型和服务
5. **团队协作**: 类型定义作为API契约，提高团队开发效率

## 🔧 最佳实践

1. **类型优先**: 在编写API服务前先定义类型
2. **接口一致**: 保持前后端API接口定义一致
3. **按模块组织**: 类型按功能模块分组
4. **导出统一**: 通过index.ts统一导出
5. **文档注释**: 为复杂类型添加JSDoc注释