<template>
  <div>
    <a-card title="借还记录">
      <div style="margin-bottom:10px">
        用户：<a-select
          show-search
          allow-clear
          :value="userId"
          placeholder="输入用户名搜索"
          style="width: 200px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleUserSearch"
          @change="handleUserChange"
        >
          <a-select-option v-for="d in userList" :key="d.value" :value="d.value">
            {{ d.text }}
          </a-select-option>
        </a-select>
        书籍：<a-select
          show-search
          allow-clear
          :value="bookId"
          placeholder="输入书名搜索"
          style="width: 250px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleBookSearch"
          @change="handleBookChange"
        >
          <a-select-option v-for="d in bookList" :key="d.value" :value="d.value">
            {{ d.text }}
          </a-select-option>
        </a-select>
        是否归还：<a-select
          allow-clear
          :value="isReturn"
          placeholder=""
          style="width: 150px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @change="handleIsReturnChange"
        >
          <a-select-option :key="1" :value="1" >
            已归还
          </a-select-option>
          <a-select-option :key="0" :value="0" >
            未归还
          </a-select-option>
        </a-select>
        是否逾期：<a-select
          allow-clear
          :value="overdue"
          placeholder=""
          style="width: 150px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @change="handleOverdueChange"
        >
          <a-select-option :key="1" :value="1" >
            已逾期
          </a-select-option>
          <a-select-option :key="0" :value="0" >
            未逾期
          </a-select-option>
        </a-select>
        ISBN: <a-input v-model="queryForm.isbn" style="width:250px"/>
        <a-button type="primary" @click="handleQueryUserBorrowLog" style="margin-left:20px">查询</a-button>
      </div>
      <a-table :dataSource="datasource" :columns="columns" :row-key="record => record.id" :pagination="pagination" @change="onChange">
        <span slot="book" slot-scope="text, record">
          <a @click="onViewBook(record.bookId)" >《{{ record.name }}》</a>
        </span>
        <span slot="user" slot-scope="text, record">
          <a @click="onViewUser(record.userId)" >{{ record.userName }}</a>
        </span>
        <span slot="action" slot-scope="record">
          <a v-if="!record.isReturn" @click="onReturnBack(record)" >归还</a>
          <a-divider type="vertical" />
        </span>
      </a-table>
    </a-card>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  data () {
    this.lastFetchId = 0
    this.handleUserSearch = debounce(this.handleUserSearch, 800)
    return {
      datasource: [],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        bookId: null,
        userId: null,
        isbn: null,
        overdue: false,
        isReturn: null
      },
      userId: null,
      bookId: null,
      userList: [],
      bookList: [],
      isReturn: null,
      overdue: null,
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
          title: '用户',
          dataIndex: 'userId',
          key: 'userId',
          scopedSlots: { customRender: 'user' }
        },
        {
          title: '书名',
          dataIndex: 'bookId',
          key: 'bookId',
          scopedSlots: { customRender: 'book' }
        },
        {
          title: '图书编号(ISBN)',
          dataIndex: 'isbn',
          key: 'isbn'
        },
        {
          title: '借出时间',
          dataIndex: 'borrowAt',
          key: 'borrowAt'
        },
        {
          title: '借出天数',
          dataIndex: 'borrowDays',
          key: 'borrowDays'
        },
        {
          title: '是否归还',
          dataIndex: 'isReturn',
          key: 'isReturn',
          customRender: (text, row, index) => {
            return row.isReturn ? '已归还' : '未归还'
          }
        },
        {
          title: '归还时间',
          dataIndex: 'returnAt',
          key: 'returnAt',
          customRender: (text, row, index) => {
            return row.isReturn ? row.returnAt : '-'
          }
        },
        {
          title: '超时天数',
          dataIndex: 'overDays',
          key: 'overDays',
          customRender: (text, row, index) => {
            return row.isReturn ? row.overDays : '-'
          }
        },
        {
          title: '罚金',
          dataIndex: 'fine',
          key: 'fine',
          customRender: (text, row, index) => {
            return '￥' + row.fine
          }
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
    ...mapActions(['queryUser', 'queryBook', 'queryUserBorrowLog', 'returnBackBook']),
    handleQueryUserBorrowLog () {
      this.queryForm.pageNum = this.pagination.current
      this.queryForm.pageSize = this.pagination.pageSize
      this.queryForm.userId = this.userId
      this.queryForm.bookId = this.bookId
      this.queryForm.isReturn = this.isReturn
      this.queryForm.overdue = this.overdue
      this.queryUserBorrowLog(this.queryForm).then(res => {
        this.datasource = res.result.result
        this.pagination.total = res.result.totalRows
      })
    },
    onSearch () {
      this.handleQueryUserBorrowLog()
    },
    onChange () {
      this.handleQueryUserBorrowLog()
    },
    handleUserSearch (value) {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.userList = []
      this.queryUser({
        'keyword': value
      }).then(res => {
        if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return
          }
          const data = res.result.result.map(user => ({
            text: `${user.name}(${user.phone})`,
            value: user.id
          }))
          this.userList = data
      })
    },
    handleUserChange (value) {
      this.userId = value
    },
    handleBookSearch (value) {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.bookList = []
      this.queryBook({
        'keyword': value
      }).then(res => {
        if (fetchId !== this.lastFetchId) {
            // for fetch callback order
            return
          }
          const data = res.result.result.map(book => ({
            text: `《${book.name}》 (${book.author})`,
            value: book.id
          }))
          this.bookList = data
      })
    },
    handleBookChange (value) {
      this.bookId = value
    },
    handleIsReturnChange (value) {
      this.isReturn = value
    },
    handleOverdueChange (value) {
      this.overdue = value
    },
    onReturnBack (record) {
      const that = this
      this.$confirm({
        title: '确定要归还吗？',
        content: '归还后库存会添加，该ISBN可再次借出',
        okText: '确定',
        okType: 'info',
        cancelText: '取消',
        onOk () {
           that.returnBackBook({
            'userId': record.userId,
            'isbn': record.isbn
          }).then(res => {
            that.handleQueryUserBorrowLog()
          })
        },
        onCancel () {
        }
      })
    },
    onViewBook (bookId) {
      console.log(bookId)
    },
    onViewUser (userId) {
      console.log(userId)
    }
  },
  mounted () {
    this.handleQueryUserBorrowLog()
  }
}
</script>
