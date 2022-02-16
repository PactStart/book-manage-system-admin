<template>
  <div>
    <a-row>
      <a-col :span="5" :style="{ paddingRight: '10px' }" >
        <a-card title="图书分类" :bordered="false">
          <book-category @change="selectCategory"/>
        </a-card>
      </a-col>
      <a-col :span="19">
        <a-card title="图书列表">
          <a-button slot="extra" type="primary" @click="onAdd">添加</a-button>
          <div style="margin-bottom:10px">
            <a-input-search placeholder="可输入书名、首字母、拼音进行模糊搜索" enter-button style="width: 400px" @search="onSearch" v-model="queryForm.keyword" />
            <a-input-search placeholder="ISBN搜索" enter-button style="width: 400px;margin-left: 20px" @search="onSearch" v-model="queryForm.isbn" />
          </div>
          <a-table :dataSource="datasource" :columns="columns" :row-key="record => record.id" :pagination="pagination" @change="onChange">
            <span slot="action" slot-scope="record">
              <a @click="onEdit(record.id)" >编辑</a>
              <a-divider type="vertical" />
              <a @click="onDelete(record.id)">删除</a>
              <a-divider type="vertical" />
              <a @click="onAddInventory(record.id)">添加ISBN</a>
              <a-divider type="vertical" />
              <a @click="onViewIsbn(record.id)">查看ISBN</a>
              <a-divider type="vertical" />
              <a @click="onViewBorrowLog(record.id)">借还记录</a>
              <a-divider type="vertical" />
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-drawer
      title="添加图书"
      placement="right"
      :closable="true"
      :visible="visible"
      width="400"
      @close="onBookAddClose"
    >
      <book-add @success="addBookSuccess"></book-add>
    </a-drawer>
    <a-drawer
      title="编辑图书"
      placement="right"
      :closable="true"
      :visible="editVisible"
      width="400"
      @close="onBookEditClose"
    >
      <book-edit :id="editBookId" @success="editBookSuccess"></book-edit>
    </a-drawer>
    <a-drawer
      title="添加ISBN"
      placement="right"
      :closable="true"
      :visible="addInventoryVisible"
      width="400"
      @close="onAddInventoryClose"
    >
      <book-inventory-add :id="editBookId" @success="addInventorySuccess"></book-inventory-add>
    </a-drawer>
    <a-drawer
      title="查看ISBN"
      placement="right"
      :closable="true"
      :visible="isbnVisible"
      width="700"
      @close="onIsbnClose"
    >
      <book-inventory-list :bookId="editBookId"></book-inventory-list>
    </a-drawer>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
import BookCategory from '@/views/book/book-category'
import BookAdd from '@/views/book/book-add'
import BookEdit from '@/views/book/book-edit'
import BookInventoryAdd from '@/views/book/book-inventory-add'
import BookInventoryList from '@/views/book/book-inventory-list'

export default {
  components: {
    BookCategory,
    BookAdd,
    BookEdit,
    BookInventoryAdd,
    BookInventoryList
  },
  data () {
    return {
      visible: false,
      editVisible: false,
      addInventoryVisible: false,
      isbnVisible: false,
      editBookId: 0,
      datasource: [],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        isbn: '',
        categoryId: null
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
          title: '书名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '拼音',
          dataIndex: 'pinyin',
          key: 'pinyin'
        },
        {
          title: '作者',
          dataIndex: 'author',
          key: 'author'
        },
        {
          title: '出版社',
          dataIndex: 'pub',
          key: 'pub'
        },
        {
          title: '总数量',
          dataIndex: 'inventory',
          key: 'inventory'
        },
        {
          title: '剩余可借数量',
          dataIndex: 'remainInventory',
          key: 'remainInventory'
        },
        {
          title: '添加时间',
          dataIndex: 'createAt',
          key: 'createAt'
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          // width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['queryBook', 'deleteBook']),
    handleQueryBook () {
      this.queryForm.pageNum = this.pagination.current
      this.queryForm.pageSize = this.pagination.pageSize
      this.queryBook(this.queryForm).then(res => {
        this.datasource = res.result.result
        this.pagination.total = res.result.totalRows
      })
    },
    selectCategory (data) {
      this.queryForm.categoryId = data.id
      this.handleQueryBook()
    },
    onSearch () {
      this.handleQueryBook()
    },
    onChange () {
      this.handleQueryBook()
    },
    onAdd () {
      this.visible = true
    },
    onEdit (id) {
      this.editVisible = true
      this.editBookId = id
    },
    onDelete (id) {
      const that = this
      this.$confirm({
        title: '确定要删除该书籍吗？',
        content: '无在借记录方可删除，删除后不再显示',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
           that.deleteBook({
            'id': id
          }).then(res => {
            that.handleQueryBook()
          })
        },
        onCancel () {
        }
      })
    },
    onViewBorrowLog () {
      this.$router.push({ path: '/book/book-borrow-log' })
    },
    onBookAddClose () {
      this.visible = false
    },
    addBookSuccess () {
      this.visible = false
      this.handleQueryBook()
    },
    onBookEditClose () {
      this.editVisible = false
    },
    editBookSuccess () {
      this.editVisible = false
      this.handleQueryBook()
    },
    onAddInventory (id) {
      this.editBookId = id
      this.addInventoryVisible = true
    },
    onAddInventoryClose () {
      this.addInventoryVisible = false
    },
    addInventorySuccess () {
      this.addInventoryVisible = false
      this.handleQueryBook()
    },
    onViewIsbn (id) {
      this.isbnVisible = true
      this.editBookId = id
    },
    onIsbnClose () {
      this.isbnVisible = false
    }
  },
  mounted () {
    this.handleQueryBook()
  }
}
</script>
