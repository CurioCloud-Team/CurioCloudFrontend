import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginSuccessPage from '../views/LoginSuccessPage.vue'
import RegisterSuccessPage from '../views/RegisterSuccessPage.vue'
import ForgotPasswordPage from '../views/ForgotPasswordPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
