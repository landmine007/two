export default [
  {
    path: '/assetManagement',
    component: 'Layout',
    meta: { title: '资产管理', icon: 'table' },
    children: [
      {
        path: '/assetList',
        name: 'assetList',
        component: 'assetList',
        meta: { title: '资产列表', icon: 'peoples' }
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: 'userManage',
        meta: { title: '管理用户', icon: 'tab' }
      },
      {
        path: '/systemUser',
        name: 'systemUser',
        component: 'systemUser',
        meta: { title: '系统用户', icon: 'example' }
      }
    ]
  },
  {
    path: '/baseManagement',
    component: 'Layout',
    meta: { title: '基础管理', icon: 'table' },
    children: [
      {
        path: '/systemStaff',
        name: 'systemStaff',
        component: 'systemStaff',
        meta: { title: '系统员工管理', icon: 'peoples' }
      },
      {
        path: '/systemOrganization',
        name: 'systemOrganization',
        component: 'systemOrganization',
        meta: { title: '系统组织管理', icon: 'tab' }
      },
      {
        path: '/platformBusiness',
        name: 'platformBusiness',
        component: 'platformBusiness',
        meta: { title: '平台业务管理', icon: 'example' }
      },
      {
        path: '/middleware',
        name: 'middleware',
        component: 'middleware',
        meta: { title: '中间件运行配置', icon: 'tab' }
      },
      {
        path: '/businessDictionary',
        name: 'businessDictionary',
        component: 'businessDictionary',
        meta: { title: '业务字典管理', icon: 'example' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
