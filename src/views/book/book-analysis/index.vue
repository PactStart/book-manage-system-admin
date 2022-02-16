<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card title="图书统计" :bordered="false">
          <p>图书数：{{ indexData.bookCount.total }}</p>
          <p>出借图书数：{{ indexData.userBorrowLogCount.borrowBookCount }}</p>
          <p>总库存：{{ indexData.bookCount.totalInventory }}</p>
          <p>剩余库存：{{ indexData.bookCount.totalRemainInventory }}</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card title="借还统计" :bordered="false">
          <p>出借总次数：{{ indexData.userBorrowLogCount.total }}</p>
          <p>在借记录：{{ indexData.userBorrowLogCount.borrowingCount }}</p>
          <p>总罚金：￥{{ indexData.userBorrowLogCount.totalFine }}</p>
          <p>&nbsp;</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card title="用户统计" :bordered="false">
          <p>总用户数：{{ indexData.userCount }}</p>
          <p>借书人数：{{ indexData.userBorrowLogCount.borrowUserCount }}</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card title="管理员统计" :bordered="false">
          <p>管理员人数：{{ indexData.managerCount }}</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { baseMixin } from '@/store/app-mixin'
  import { mapActions } from 'vuex'

  export default {
    name: 'Analysis',
    mixins: [baseMixin],
    components: {
    },
    data () {
      return {
        loading: false,
        indexData: {
          'userBorrowLogCount': {
            'total': 2,
            'borrowUserCount': 0,
            'borrowBookCount': 0,
            'borrowingCount': 0,
            'totalFine': 0
          },
          'managerCount': 0,
          'userCount': 0,
          'bookCount': {
            'total': 0,
            'totalInventory': 0,
            'totalRemainInventory': 0
          }
        }
      }
    },
    methods: {
      ...mapActions(['dashboardIndex'])
    },
    mounted () {
      this.dashboardIndex({}).then(res => {
        this.indexData = res.result
      })
    }
  }
</script>
