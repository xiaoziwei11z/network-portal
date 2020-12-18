import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect:'/layout/paint',
    component: Layout,
    name: 'paint',
    hidden: true,
    children: [{
      path: 'paint',
      component: () => import('@/views/paint/paint')
    }]
  },

  {
    path:'/layout',
    component:Layout,
    name:'layout',
    meta:{title:'作品集',icon:'example'},
    children:[
      {
        path:'label',
        name:'label',
        component:()=>import('@/views/label/label'),
        meta:{title:'标签',icon:'table'}
      },
      {
        path:'paint',
        name:'paint',
        component:()=>import('@/views/paint/paint'),
        meta:{title:'作品',icon:'table'}
      },
    ]
  },

  {
    path:'/layout',
    component:Layout,
    name:'pick',
    meta:{title:'随机抽取',icon:'table'},
    children:[
      {
        path:'pick',
        name:'pick',
        component:()=>import('@/views/pick/pick'),
        meta:{title:'随机抽取',icon:'table'}
      },
    ]
  },

  
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

