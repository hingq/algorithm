
import { createRouter, createWebHistory } from 'vue-router'
import { pageHeader } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout',
      name:'persal'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),

    },
    {
      path: '/layout',
      component: () => import('../views/layout.vue'),
      redirect:'/layout/index',
      children: [
        {
          path:'index',
          component:()=>import('../views/index.vue'),
          name:'Persal Center'
        },
        // 课程
        {
          path: 'course',
          children: [{
            path: 'student',
            component: () => import('../views/course/student.vue'),
            name:'couse'
          },
          {
            path: 'taken',
            component: () => import('../views/course/taken.vue'),
            name:'taken'
          },
          {
            path: 'select',
            component: () => import('../views/course/select.vue'),
            name:'select'
          }
          ]
        },
        // 考试
        {
          path: 'test',
          children: [{
            path: 'arrange',
            component: () => import('../views/test/arrange.vue'),
            name:'test'
          },
          {
            path: 'postpone',
            component: () => import('../views/test/postpone.vue'),
            name:'postpone'
          },
          {
            path: 'exemption',
            component: () => import('../views/test/exemption.vue'),
            name:'exemption'
          },
          {
            path: 'evaluate',
            component: () => import('../views/test/evaluate.vue'),
            name:'evaluate'
          }
          ]
        },
      ]
    },
    {
      path:'/algorithm',
      // redirect:'/algorithm/sort?key=sort&algor=buble',
      component:()=>import('@/views/algorithm/index.vue'),
      children:[
        {
          path:'sort',
          component:()=>import('@/components/algorithm/sort.vue')
        },
        {
          path:'binary',
          component:()=>import('@/components/algorithm/binary.vue')
        },
      ]
    },
    {
      path: '/404',
      component: () => import('../components/err.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    },
  ]
})
router.beforeEach( async(to,_,next)=>{
  pageHeader.setPage(to)
  next()
})
export default router
