import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/users/detail',
    component: Layout,
    hidden: true,
    children: [{
      path: ':id',
      name: 'users-detail',
      component: () => import('@/views/users/detail'),
      meta: { title: 'Chi tiết', icon: 'dashboard' }
    }]
  },
  {
    path: '/auctions/detail',
    component: Layout,
    hidden: true,
    children: [{
      path: ':id',
      name: 'auctions-detail',
      component: () => import('@/views/auctions/detail'),
      meta: { title: 'Chi tiết', icon: 'dashboard' }
    }]
  },
  {
    path: '/auctions/bid-list',
    component: Layout,
    hidden: true,
    children: [{
      path: ':id',
      name: 'auctions-bid-list',
      component: () => import('@/views/auctions/bid-list'),
      meta: { title: 'Danh sách các lượt đấu', icon: 'dashboard' }
    }]
  },
  {
    path: '/auctions/registration-list',
    component: Layout,
    hidden: true,
    children: [{
      path: ':id',
      name: 'auctions-registration-list',
      component: () => import('@/views/auctions/registration-list'),
      meta: { title: 'Danh sách người đăng ký', icon: 'dashboard' }
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Tổng quan', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    hidden: true,
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/users',
    component: Layout,
    meta: { title: 'Người dùng', icon: 'user' },
    children: [
      {
        path: 'users-list',
        name: 'users-list',
        component: () => import('@/views/users/list'),
        meta: { title: 'Danh sách', icon: 'table' }
      },
      {
        path: '2',
        name: '2',
        component: () => import('@/views/users/waitapprove'),
        meta: { title: 'Chờ phê duyệt', icon: 'eye-open' }
      }
    ]
  },

  {
    path: '/auctions',
    component: Layout,
    meta: { title: 'Đấu giá', icon: 'form' },
    children: [
      {
        path: 'auctions-create',
        name: 'auctions-create',
        component: () => import('@/views/auctions/create'),
        meta: { title: 'Tạo đấu giá', icon: 'auction' }
      },
      {
        path: 'auctions-list',
        name: 'auctions-list',
        component: () => import('@/views/auctions/list'),
        meta: { title: 'Danh sách', icon: 'table' }
      },
      {
        path: 'auc3',
        name: 'auc3',
        component: () => import('@/views/table'),
        meta: { title: 'Kết quả', icon: 'eye-open' }
      },
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    hidden: true,
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
