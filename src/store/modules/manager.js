import { addManager, queryManager, deleteManager, getManager, updateManager } from '@/api/manager'

const manager = {
  state: {
  },

  mutations: {
  },
  actions: {
    addManager ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addManager(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryManager ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryManager(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteManager ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteManager(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getManager ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getManager(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateManager ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateManager(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default manager
