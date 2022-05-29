<template>
  <div>
    <n-grid :x-gap="10">
      <n-grid-item :span="5">
        <n-card
          class="h-full"
          :content-style="{ padding: '5px' }"
          :header-style="{ padding: '5px' }"
          :segmented="true"
        >
          <template #header>
            <div class="flex items-center">
              <n-input class="mr-2" v-model:value="pattern" placeholder="搜索" size="small" />
              <n-switch size="small" v-model:value="expandAllFlag" />
            </div>
          </template>
          <n-tree
            :expanded-keys="getExpandedKeys"
            block-line
            :pattern="pattern"
            :data="departmentData"
            selectable
            :on-update:expanded-keys="onUpdateExpandedKeys"
            :on-update:selected-keys="onCheckedKeys"
          />
        </n-card>
      </n-grid-item>
      <n-grid-item :span="19">
        <div>
          <BasicTable
            ref="actionRef"
            :columns="columns"
            :request="loadDataTable"
            :row-key="(row) => row.id"
            :pagination="{ pageSizes: [5, 10, 15] }"
            :can-resize="true"
            :action-column="actionColumn"
            :scroll-x="1090"
            @update:checked-row-keys="onCheckedRow"
          >
            <template #tableTitle>
              <n-button type="primary" @click="addTable">
                <template #icon>
                  <n-icon>
                    <i-ant-design-plus-outlined />
                  </n-icon>
                </template>
                新建
              </n-button>
            </template>

            <template #toolbar>
              <n-button type="primary" @click="reloadTable">刷新数据</n-button>
            </template>
          </BasicTable>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction, BasicColumn } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { demoListApi } from '/@/api/demo/table';
  import { columns } from './columns';
  import { schemas, modelSchemas } from './data';
  import { ref, shallowReactive, watch } from 'vue';

  const formRef: any = ref(null);
  const message = useMessage();
  const actionRef = ref();
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });
  const params = ref({
    pageSize: 5,
    name: 'xiaoMa',
  });
  const actionColumn: BasicColumn = {
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    // @ts-ignore
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: '删除',
            icon: 'ic:outline-delete-outline',
            quaternary: true,
            type: 'error',
            popConfirm: {
              title: '真的要删除吗？',
              icon: 'ic:outline-delete-outline',
              onPositiveClick: handleDelete.bind(null, record),
            },
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['super'],
          },
          {
            label: '编辑',
            quaternary: true,
            type: 'info',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['super'],
          },
        ],
        dropDownActions: [
          {
            label: '启用',
            key: 'enabled',
            // 根据业务控制是否显示: 非enable状态的不显示启用按钮
            ifShow: () => {
              return true;
            },
          },
          {
            label: '禁用',
            key: 'disabled',
            ifShow: () => {
              return true;
            },
          },
        ],
        select: (key) => {
          message.info(`您点击了，${key} 按钮`);
        },
      });
    },
  };

  const [register] = useForm({
    gridProps: { cols: '1 sm:2 xl:3', xGap: 24 },
    inline: true,
    schemas,
  });
  function addTable() {
    showModal.value = true;
  }

  const loadDataTable = async (res) => {
    return await demoListApi({ ...formParams, ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('新建成功');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        message.error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }
  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    message.info('点击了编辑');
  }
  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    message.info('点击了删除');
  }
  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }
  function handleReset(values: Recordable) {
    console.log(values);
  }

  const departmentData = [
    {
      label: '东部地区',
      key: 1,
      children: [
        {
          label: '总裁部',
          key: 11,
        },
        {
          label: '财务部',
          key: 12,
        },
        {
          label: '技术部',
          key: 13,
        },
        {
          label: '销售部',
          key: 14,
        },
      ],
    },
    {
      label: '西部地区',
      key: 2,
      children: [
        {
          label: '总裁部',
          key: 21,
        },
        {
          label: '财务部',
          key: 22,
        },
        {
          label: '技术部',
          key: 23,
        },
        {
          label: '销售部',
          key: 24,
        },
      ],
    },
    {
      label: '南部地区',
      key: 3,
      children: [
        {
          label: '总裁部',
          key: 31,
        },
        {
          label: '财务部',
          key: 32,
        },
        {
          label: '技术部',
          key: 33,
        },
        {
          label: '销售部',
          key: 34,
        },
      ],
    },
    {
      label: '北部地区',
      key: 4,
      children: [
        {
          label: '总裁部',
          key: 41,
        },
        {
          label: '财务部',
          key: 42,
        },
        {
          label: '技术部',
          key: 43,
        },
        {
          label: '销售部',
          key: 44,
        },
      ],
    },
  ];
  const expandAllFlag = ref(false);
  const pattern = ref('');
  function onRowCheck(rowKeys: Array<any>) {
    checkedRowKeys.length = 0;
    checkedRowKeys.push(...rowKeys);
  }
  function onUpdateExpandedKeys(keys: any) {
    getExpandedKeys.length = 0;
    getExpandedKeys.push(...keys);
  }
  function onCheckedKeys(keys: any) {
    message.success('选中的值为--->' + JSON.stringify(keys));
  }
  const getExpandedKeys = shallowReactive([] as Array<number>);
  watch(
    () => expandAllFlag.value,
    (newVal) => {
      newVal
        ? getExpandedKeys.push(...departmentData.map((it) => it.key))
        : (getExpandedKeys.length = 0);
    }
  );
</script>

<style lang="scss" scoped>
  .avatar-container {
    position: relative;
    width: 30px;
    margin: 0 auto;
    vertical-align: middle;
    .avatar {
      width: 100%;
      border-radius: 50%;
    }
    .avatar-vip {
      border: 2px solid #cece1e;
    }
    .vip {
      position: absolute;
      top: 0;
      right: -9px;
      width: 15px;
      transform: rotate(60deg);
    }
  }
  .gender-container {
    .gender-icon {
      width: 20px;
    }
  }
</style>
