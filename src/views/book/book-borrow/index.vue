<template>
  <a-card title="借书">
    <a-form-model
      id="components-form"
      :model="form"
      class="book-borrow-form"
    >
      <a-form-model-item label="ISBN" style="width:500px">
        <a-input
          v-model="form.isbn"
          placeholder="isbn"
        >
          <a-icon slot="prefix" type="book" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="用户">
        <a-select
          show-search
          allow-clear
          v-model="form.userId"
          placeholder="输入用户名搜索"
          style="width: 500px"
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
      </a-form-model-item>
      <a-form-model-item label="借出天数" style="width:500px">
        <a-input
          v-model="form.borrowDays"
          placeholder=""
        >
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" class="borrow-form-button" @click="handleSubmit">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  data () {
    this.lastFetchId = 0
    this.handleUserSearch = debounce(this.handleUserSearch, 800)
    return {
      form: {
        userId: null,
        isbn: '',
        borrowDays: 7
      },
      userList: []
    }
  },
  beforeCreate () {
  },
  mounted () {
  },
  methods: {
    ...mapActions(['queryUser', 'borrowBook']),
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
    handleSubmit (e) {
      this.borrowBook(this.form).then(res => {
        this.$Message.success('借出成功')
        this.form = {
          userId: null,
          isbn: '',
          borrowDays: 7
        }
      })
    }
  }
}
</script>
<style>
#components-form .book-borrow-form {
  max-width: 550px;
}
#components-form .borrow-form-button {
  width: 100px;
}
</style>
