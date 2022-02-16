<template>
  <a-form-model
    id="components-form"
    :model="form"
    class="user-edit-form"
  >
    <a-form-model-item label="姓名">
      <a-input
        v-model="form.name"
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入姓名' }] },
        ]"
        placeholder="name"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="手机号">
      <a-input
        v-model="form.phone"
        v-decorator="[
          'phone',
          { rules: [{ required: true, message: '请输入手机号' }] },
        ]"
        placeholder="phone"
      >
        <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="邮箱">
      <a-input
        v-model="form.email"
        v-decorator="[
          'email',
          { rules: [{ required: true, message: '请输入邮箱' }] },
        ]"
        placeholder="mail"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="密码">
      <a-input
        v-model="form.password"
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入初始密码' }] },
        ]"
        type="password"
        placeholder="password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
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

      }
    }
  },
  beforeCreate () {
  },
  mounted () {
    this.handleGetUser()
  },
  methods: {
    ...mapActions(['getUser', 'updateUser']),
    handleSubmit (e) {
      this.updateUser(this.form).then(res => {
        this.$emit('success')
      })
    },
    handleGetUser () {
      this.getUser({
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
      this.handleGetUser()
    }
  }
}
</script>
<style>
#components-form .user-edit-form {
  max-width: 350px;
}
#components-form .edit-form-button {
  width: 100%;
}
</style>
