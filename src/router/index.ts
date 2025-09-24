import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginSuccessPage from '../views/LoginSuccessPage.vue'
import RegisterSuccessPage from '../views/RegisterSuccessPage.vue'
import ForgotPasswordPage from '../views/ForgotPasswordPage.vue'
import DashboardHome from '../views/DashboardHome.vue'
import TeachingDesign from '../views/TeachingDesign.vue'
import TeachingOutlineDetail from '../views/TeachingOutlineDetail.vue'
import TeachingPlanStart from '../views/TeachingPlanStart.vue'
import CreateTeachingPlan from '../views/CreateTeachingPlan.vue'
import TeachingResources from '../views/TeachingResources.vue'
import ExerciseAssistant from '../views/ExerciseAssistant.vue'
import ExerciseGenerationResult from '../views/ExerciseGenerationResult.vue'
import LearningAnalysis from '../views/LearningAnalysis.vue'
import AnalysisResult from '../views/AnalysisResult.vue'
import SavedReports from '../views/SavedReports.vue'
import PPTGenerationResult from '../views/PPTGenerationResult.vue'
import PPTViewer from '../views/PPTViewer.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage
      },
      {
        path: 'register',
        name: 'Register', 
        component: RegisterPage
      },
      {
        path: 'login-success',
        name: 'LoginSuccess',
        component: LoginSuccessPage
      },
      {
        path: 'register-success',
        name: 'RegisterSuccess',
        component: RegisterSuccessPage
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordPage
      },
      {
        path: '',
        redirect: '/auth/login'
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'home',
        name: 'DashboardHome',
        component: DashboardHome
      },
      {
        path: 'teaching-design',
        name: 'TeachingDesign',
        component: TeachingDesign
      },
      {
        path: 'teaching-design/outline/:id',
        name: 'TeachingOutlineDetail',
        component: TeachingOutlineDetail
      },
      {
        path: 'teaching-design/start',
        name: 'TeachingPlanStart',
        component: TeachingPlanStart
      },
      {
        path: 'teaching-design/create',
        name: 'CreateTeachingPlan',
        component: CreateTeachingPlan
      },
      {
        path: 'teaching-resources',
        name: 'TeachingResources',
        component: TeachingResources
      },
      {
        path: 'ppt-generation/:planId',
        name: 'PPTGenerationResult',
        component: PPTGenerationResult
      },
      {
        path: 'ppt-viewer/:pptId',
        name: 'PPTViewer',
        component: PPTViewer
      },
      {
        path: 'exercise-assistant',
        name: 'ExerciseAssistant',
        component: ExerciseAssistant
      },
      {
        path: 'exercise-assistant/result',
        name: 'ExerciseGenerationResult',
        component: ExerciseGenerationResult
      },
      {
        path: 'learning-analysis',
        name: 'LearningAnalysis',
        component: LearningAnalysis
      },
      {
        path: 'learning-analysis/result',
        name: 'AnalysisResult',
        component: AnalysisResult
      },
      {
        path: 'learning-analysis/saved-reports',
        name: 'SavedReports',
        component: SavedReports
      },
      {
        path: '',
        redirect: '/dashboard/home'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查认证状态
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const isAuthRoute = to.path.startsWith('/auth')
  const isDashboardRoute = to.path.startsWith('/dashboard')

  // 如果访问仪表盘但未登录，重定向到登录页
  if (isDashboardRoute && !token) {
    console.log('未登录，重定向到登录页')
    next('/auth/login')
    return
  }

  // 如果已登录但访问认证页面，重定向到仪表盘
  if (isAuthRoute && token && to.path !== '/auth/login-success') {
    console.log('已登录，重定向到仪表盘')
    next('/dashboard/home')
    return
  }

  next()
})

export default router
