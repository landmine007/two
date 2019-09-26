import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the pages roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the pages will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const routerMap = {
  Layout: Layout,
  assetList: () => import('@/views/pages/assetManagement/assetList'),
  userManage: () => import('@/views/pages/assetManagement/userManage'),
  systemUser: () => import('@/views/pages/assetManagement/systemUser'),
  systemStaff: () => import('@/views/pages/baseManagement/systemStaff'),
  systemOrganization: () => import('@/views/pages/baseManagement/systemOrganization'),
  platformBusiness: () => import('@/views/pages/baseManagement/platformBusiness'),
  middleware: () => import('@/views/pages/baseManagement/middleware'),
  businessDictionary: () => import('@/views/pages/baseManagement/businessDictionary')
}

export const asyncRouterMap = [
  {
    path: '/assetManagement',
    component: Layout,
    meta: { title: '资产管理', icon: 'table' },
    children: [
      {
        path: '/assetList',
        name: 'assetList',
        component: () => import('@/views/pages/assetManagement/assetList'),
        meta: { title: '资产列表', icon: 'peoples' }
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: () => import('@/views/pages/assetManagement/userManage'),
        meta: { title: '管理用户', icon: 'tab' }
      },
      {
        path: '/systemUser',
        name: 'systemUser',
        component: () => import('@/views/pages/assetManagement/systemUser'),
        meta: { title: '系统用户', icon: 'example' }
      }
    ]
  },

  {
    path: '/baseManagement',
    component: Layout,
    meta: { title: '基础管理', icon: 'table' },
    children: [
      {
        path: '/systemStaff',
        name: 'systemStaff',
        component: () => import('@/views/pages/baseManagement/systemStaff'),
        meta: { title: '系统员工管理', icon: 'peoples' }
      },
      {
        path: '/systemOrganization',
        name: 'systemOrganization',
        component: () => import('@/views/pages/baseManagement/systemOrganization'),
        meta: { title: '系统组织管理', icon: 'tab' }
      },
      {
        path: '/platformBusiness',
        name: 'platformBusiness',
        component: () => import('@/views/pages/baseManagement/platformBusiness'),
        meta: { title: '平台业务管理', icon: 'example' }
      },
      {
        path: '/middleware',
        name: 'middleware',
        component: () => import('@/views/pages/baseManagement/middleware'),
        meta: { title: '中间件运行配置', icon: 'tab' }
      },
      {
        path: '/businessDictionary',
        name: 'businessDictionary',
        component: () => import('@/views/pages/baseManagement/businessDictionary'),
        meta: { title: '业务字典管理', icon: 'example' }
      }
    ]
  },

  // {
  //   path: '/serverManagement',
  //   component: Layout,
  //   meta: { title: '服务器管理', icon: 'table' },
  //   children: [
  //     {
  //       path: '/platformCommunication',
  //       component: () => import('@/views/pages/serverManagement/platformCommunication'),
  //       meta: { title: '平台通讯配置', icon: 'peoples' }
  //     },
  //     {
  //       path: '/serverAssets',
  //       component: () => import('@/views/pages/serverManagement/serverAssets'),
  //       meta: { title: '服务器资产管理', icon: 'tab' }
  //     },
  //     {
  //       path: '/assetUserQuery',
  //       component: () => import('@/views/pages/serverManagement/assetUserQuery'),
  //       meta: { title: '资产用户查询', icon: 'example' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
