<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">

        <a-form-model layout="vertical" :v-model="currentManager">
          <a-form-item
            :label="$t('account.settings.basic.name')"
          >
            <a-input :placeholder="$t('account.settings.basic.name-message')" v-model="currentManager.name" />
          </a-form-item>
          <!-- <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea rows="4" :placeholder="$t('account.settings.basic.profile-message')"/>
          </a-form-item> -->

          <a-form-model-item
            :label="$t('account.settings.basic.email')"
            :required="false"
          >
            <a-input placeholder="example@gmail.com" v-model="currentManager.email"/>
          </a-form-model-item>

          <a-form-model-item>
            <a-button type="primary" @click="updateMy">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-model-item>
        </a-form-model>

      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import { mapActions } from 'vuex'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      currentManager: {}
    }
  },
  methods: {
    ...mapActions(['updateManager']),
    setavatar (url) {
      this.option.img = url
    },
    updateMy () {
      this.updateManager(this.currentManager).then(res => {
        this.$message.info('更新成功')
      })
    }
  },
  mounted () {
    this.currentManager = this.$store.getters.userInfo
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
