import { dashboardIndex } from '@/api/dashboard'

const dashboard = {
  state: {
  },

  mutations: {
  },
  actions: {
    dashboardIndex ({ commit }, params) {
      return new Promise((resolve, reject) => {
        dashboardIndex(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default dashboard
