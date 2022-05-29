import type { ProjectConfig } from '/#/config';
// import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
// import { CacheTypeEnum } from '/@/enums/cacheEnum';
// import {
//   ContentEnum,
//   PermissionModeEnum,
//   ThemeEnum,
//   RouterTransitionEnum,
//   SettingButtonPositionEnum,
//   SessionTimeoutProcessingEnum,
// } from '/@/enums/appEnum';
// import { primaryColor } from '../../build/config/themeConfig';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  showSettingButton: true,
  showDarkModeToggle: true,
  settingButtonPosition: 'auto',
  permissionMode: 'ROUTE_MAPPING',
  permissionCacheType: 1,
  sessionTimeoutProcessing: 0,
  themeColor: '#009688',
  fullContent: false,
  contentMode: 'full',
  showLogo: true,
  showFooter: false,
  headerSetting: {
    height: 48,
    fixed: true,
    show: true,
    theme: 'light',
  },
  menuSetting: {
    inverted: true,
    fixed: true,
    collapsed: false,
    collapsedShowTitle: false,
    show: true,
    hidden: false,
    menuWidth: 190,
    menuRootIndent: 24,
    menuIndent: 24,
    menuCollapsedWidth: 48,
    mode: 'vertical',
    type: 'mix-sidebar',
    theme: 'dark',
    split: false,
    topMenuAlign: 'center',
    trigger: 'header',
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: 'click',
    mixSideFixed: true,
  },
  multiTabsSetting: {
    cache: false,
    show: true,
  },
  transitionSetting: {
    enable: true,
    basicTransition: 'fade-slide-right',
    openPageLoading: false,
    openNProgress: true,
  },
  openKeepAlive: true,
  showBreadCrumb: true,
  showBreadCrumbIcon: true,
  useErrorHandle: false,
  useOpenBackTop: true,
  canEmbedIFramePage: true,
  closeMessageOnSwitch: true,
  removeAllHttpPending: false,
};

export default setting;
