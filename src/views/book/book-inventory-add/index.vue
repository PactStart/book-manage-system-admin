<template>
  <a-form-model
    id="components-form"
    :model="form"
    class="book-edit-form"
  >
    <a-form-model-item label="书名">
      <a-input
        v-model="form.name"
        read-only
        placeholder="name"
      >
        <a-icon slot="prefix" type="book" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="ISBN">
      <a-input
        type="textarea"
        v-model="form.isbnText"
        placeholder="一行一个ISBN号"
        :auto-size="{ minRows: 10, maxRows: 50 }"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" class="edit-form-button" @click="handleSubmit">
        提交
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      form: {
        bookId: 0,
        name: '',
        isbnText: '',
        isbnList: []
      }
    }
  },
  beforeCreate () {
  },
  mounted () {
    this.handleGetBook()
  },
  methods: {
    ...mapActions(['getBook', 'addBookInventory']),
    handleSubmit () {
      let isbnList = this.form.isbnText.split('\n')
      isbnList = isbnList.map(item => item.trim()).filter(item => item.trim())
      console.log(isbnList)
      this.form.isbnList = isbnList
      const that = this
      this.$confirm({
        title: '确定要添加库存吗？',
        content: '有效ISBN号' + isbnList.length + '个',
        okText: '确定',
        okType: 'info',
        cancelText: '取消',
        onOk () {
          that.addBookInventory(that.form).then(res => {
            that.form = {}
            that.$emit('success')
          })
        },
        onCancel () {
        }
      })
    },
    handleGetBook () {
      this.getBook({
        'id': this.id
      }).then(res => {
        console.log(res)
        this.form.bookId = res.result.id
        this.form.name = res.result.name
      })
    }
  },
  watch: {
    id: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      this.handleGetBook()
    }
  }
}
</script>
<style>
#components-form .book-edit-form {
  max-width: 350px;
}
#components-form .edit-form-button {
  width: 100%;
}
</style>
