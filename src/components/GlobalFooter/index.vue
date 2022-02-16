<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://github.com/zhuyajie666/book_system" target="_blank">图书管理系统</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/zhuyajie666/" target="_blank">朱雅洁</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
