import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/composables/web/useI18n';

const routes: AppRouteModule = {
  path: '/system',
  name: 'SystemPage',
  component: LAYOUT,
  redirect: '/system/user',
  meta: {
    orderNo: 500,
    icon: 'akar-icons:circle-check',
    title: '系统管理',
  },
  children: [
    {
      path: 'user',
      name: 'userPage',
      component: () => import('/@/views/system/user.vue'),
      meta: {
        title: '用户管理',
      },
    },
    // {
    //   path: 'dic',
    //   name: 'dicPage',
    //   component: () => import('/@/views/system/menu.vue'),
    //   meta: {
    //     title: '菜单管理',
    //   },
    // },
    // {
    //   path: 'setting',
    //   name: 'settingPage',
    //   component: () => import('/@/views/systema/role.vue'),
    //   meta: {
    //     title: '角色管理',
    //   },
    // },
  ],
};

export default routes;
