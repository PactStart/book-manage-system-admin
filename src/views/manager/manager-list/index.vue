<template>
  <div>
    <a-card title="管理员列表">
      <a-button slot="extra" type="primary" @click="onAdd">添加</a-button>
      <div style="margin-bottom:10px">
        姓名: <a-input v-model="queryForm.name" allow-clear style="width:250px"/>
        手机号: <a-input v-model="queryForm.phone" allow-clear style="width:250px"/>
        邮箱: <a-input v-model="queryForm.email" allow-clear style="width:250px"/>
        <a-button type="primary" @click="handleQueryManager" style="margin-left:20px">查询</a-button>
      </div>
      <a-table :dataSource="datasource" :columns="columns" :row-key="record => record.id" :pagination="pagination" @change="onChange">
        <span slot="action" slot-scope="record">
          <a @click="onEdit(record.id)" >编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record.id)">删除</a>
          <a-divider type="vertical" />
        </span>
      </a-table>
      <a-drawer
        title="添加管理员"
        placement="right"
        :closable="true"
        :visible="visible"
        width="400"
        @close="onAddClose"
      >
        <manager-add @success="addSuccess"></manager-add>
      </a-drawer>
      <a-drawer
        title="编辑管理员"
        placement="right"
        :closable="true"
        :visible="editVisible"
        width="400"
        @close="onEditClose"
      >
        <manager-edit :id="editId" @success="editSuccess"></manager-edit>
      </a-drawer>
    </a-card>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import ManagerAdd from '@/views/manager/manager-add'
import ManagerEdit from '@/views/manager/manager-edit'

export default {
  components: {
    ManagerAdd,
    ManagerEdit
  },
  data () {
    return {
      editId: 0,
      visible: false,
      editVisible: false,
      datasource: [],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        phone: '',
        email: ''
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        hideOnSinglePage: false,
        showQuickJumper: true,
        showSizeChanger: true
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '添加时间',
          dataIndex: 'createAt',
          key: 'createAt'
        },
        {
          title: '更新时间',
          dataIndex: 'updateAt',
          key: 'updateAt'
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['queryManager', 'deleteManager']),
    handleQueryManager () {
      this.queryForm.pageNum = this.pagination.current
      this.queryForm.pageSize = this.pagination.pageSize
      this.queryManager(this.queryForm).then(res => {
        this.datasource = res.result.result
        this.pagination.total = res.result.totalRows
      })
    },
    onSearch () {
      this.handleQueryManager()
    },
    onChange () {
      this.handleQueryManager()
    },
    onDelete (id) {
      const that = this
      this.$confirm({
        title: '确定要删除该管理员吗？',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
           that.deleteManager({
            'id': id
          }).then(res => {
            that.handleQueryManager()
          })
        },
        onCancel () {
        }
      })
    },
    onAdd () {
      this.visible = true
    },
    onAddClose () {
      this.visible = false
    },
    addSuccess () {
      this.visible = false
      this.handleQueryManager()
    },
    onEdit (id) {
      this.editId = id
      this.editVisible = true
    },
    onEditClose () {
      this.editVisible = false
    },
    editSuccess () {
      this.editVisible = false
      this.handleQueryManager()
    }
  },
  mounted () {
    this.handleQueryManager()
  }
}
</script>
