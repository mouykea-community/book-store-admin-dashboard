import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import BookCreateView from '@/views/Books/BookCreateView.vue'
import BookListView from '@/views/Books/BookListView.vue'
// import BookPreviewView from '@/views/Books/BookPreviewView.vue'
import BookUpdateView from '@/views/Books/BookUpdateView.vue'
import CategoryView from '@/views/CategoryView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import OrderView from '@/views/OrderView.vue'
import SettingView from '@/views/SettingView.vue'
import UserCreateView from '@/views/Users/UserCreateView.vue'
import UserListView from '@/views/Users/UserListView.vue'
import UserPreviewView from '@/views/Users/UserPreviewView.vue'
import UserUpdateView from '@/views/Users/UserUpdateView.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'category',
          name: 'category',
          component: CategoryView
        },
        {
          path: 'book',
          children: [
            {
              path: '',
              name: 'article.index',
              component : BookListView
            },
            {
              path: 'create',
              name: 'article.create',
              component : BookCreateView
            },
            // {
            //   path: ':id',
            //   name: 'article.preview',
            //   component : BookPreviewView
            // },
            {
              path: ':id/update',
              name: 'article.update',
              component: BookUpdateView
            }
          ]
        },
        {
          path: 'user',
          children: [
            {
              path: '',
              name : 'user.index',
              component : UserListView
            },
            {
              path: 'create',
              name: 'user.create',
              component : UserCreateView
            },
            {
              path: ':id',
              name: 'user.preview',
              component : UserPreviewView
            },
            {
              path: ':id/update',
              name: 'user.update',
              component : UserUpdateView
            }
          ]
        },
        {
          path: 'order',
          name: 'order',
          component : OrderView
        },
        {
          path: 'setting',
          name: 'setting',
          component : SettingView
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
})

export default router
