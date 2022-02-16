<template>
  <a-form-model
    id="components-form"
    :model="form"
    class="book-edit-form"
  >
    <a-form-model-item label="书名">
      <a-input
        v-model="form.name"
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入书名' }] },
        ]"
        placeholder="name"
      >
        <a-icon slot="prefix" type="book" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="作者">
      <a-input
        v-model="form.author"
        v-decorator="[
          'author',
          { rules: [{ required: true, message: '请输入作者' }] },
        ]"
        placeholder="author"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="出版单位">
      <a-input
        v-model="form.pub"
        v-decorator="[
          'pub',
          { rules: [{ required: true, message: '请输入出版单位' }] },
        ]"
        placeholder="pub"
      >
        <a-icon slot="prefix" type="home" style="color: rgba(0,0,0,.25)" />
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
      form: {}
    }
  },
  beforeCreate () {
  },
  mounted () {
    this.handleGetBook()
  },
  methods: {
    ...mapActions(['getBook', 'updateBook']),
    handleSubmit (e) {
      this.updateBook(this.form).then(res => {
        this.$emit('success')
      })
    },
    handleGetBook () {
      this.getBook({
        'id': this.id
      }).then(res => {
        console.log(res)
        this.form = res.result
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
