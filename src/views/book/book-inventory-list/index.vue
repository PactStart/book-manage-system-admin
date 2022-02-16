<template>
  <div>
    <div style="margin-bottom:10px">
      ISBN: <a-input style="width: 200px;margin-left: 20px" v-model="queryForm.isbn" />
      是否借出：<a-select
        allow-clear
        v-model="queryForm.borrowed"
        placeholder=""
        style="width: 150px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
      >
        <a-select-option :key="1" :value="1" >
          已借出
        </a-select-option>
        <a-select-option :key="0" :value="0" >
          未借出
        </a-select-option>
      </a-select>
      <a-button type="primary" @click="handleQueryISBN" style="margin-left:20px">查询</a-button>
    </div>
    <a-table :dataSource="datasource" :columns="columns" :pagination="pagination" :row-key="record => record.isbn" @change="handleQueryISBN">
    </a-table>
  </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
  props: {
    bookId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'ISBN',
          dataIndex: 'isbn',
          key: 'isbn'
        },
        {
          title: '是否借出',
          dataIndex: 'borrowed',
          key: 'borrowed',
          customRender: (text, row, index) => {
            return row.borrowed ? '已借出' : '未借出'
          }
        }
      ],
      datasource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        hideOnSinglePage: false,
        showQuickJumper: true,
        showSizeChanger: true
      },
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        isbn: '',
        bookId: null,
        borrowed: 0
      }
    }
  },
  methods: {
    ...mapActions(['queryBookIsbn']),
    handleQueryISBN () {
      this.queryForm.pageNum = this.pagination.current
      this.queryForm.pageSize = this.pagination.pageSize
      this.queryBookIsbn(this.queryForm).then(res => {
        this.datasource = res.result.result
        this.pagination.total = res.result.totalRows
      })
    }
  },
  watch: {
    bookId: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      this.handleQueryISBN()
    }
  },
  mounted () {
    this.handleQueryISBN()
  }
}
</script>
