<template>
  <a-form
    id="components-form"
    :form="form"
    class="user-add-form"
    @submit="handleSubmit"
  >
    <a-form-item label="姓名">
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入姓名' }] },
        ]"
        placeholder="name"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="手机号">
      <a-input
        v-decorator="[
          'phone',
          { rules: [{ required: true, message: '请输入手机号' }] },
        ]"
        placeholder="phone"
      >
        <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input
        v-decorator="[
          'email',
          { rules: [{ required: true, message: '请输入邮箱' }] },
        ]"
        placeholder="mail"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item label="密码">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入初始密码' }] },
        ]"
        type="password"
        placeholder="password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
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
    this.form = this.$form.createForm(this, { name: 'userAdd' })
  },
  methods: {
    ...mapActions(['addUser']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.addUser(values).then(res => {
            this.$emit('success')
          })
        }
      })
    }
  }
}
</script>
<style>
#components-form .user-add-form {
  max-width: 350px;
}
#components-form .add-form-button {
  width: 100%;
}
</style>
