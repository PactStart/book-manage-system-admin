<template>
  <a-form
    id="components-form"
    :form="form"
    class="book-add-form"
    @submit="handleSubmit"
  >
    <a-form-item label="书名">
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入书名' }] },
        ]"
        placeholder="name"
      >
        <a-icon slot="prefix" type="book" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="作者">
      <a-input
        v-decorator="[
          'author',
          { rules: [{ required: true, message: '请输入作者' }] },
        ]"
        placeholder="author"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="出版单位">
      <a-input
        v-decorator="[
          'pub',
          { rules: [{ required: true, message: '请输入出版单位' }] },
        ]"
        placeholder="pub"
      >
        <a-icon slot="prefix" type="home" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="add-form-button">
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'bookAdd' })
  },
  methods: {
    ...mapActions(['addBook']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.addBook(values).then(res => {
            this.$emit('success')
          })
        }
      })
    }
  }
}
</script>
<style>
#components-form .book-add-form {
  max-width: 350px;
}
#components-form .add-form-button {
  width: 100%;
}
</style>
