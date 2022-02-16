import { addUser, queryUser, deleteUser, getUser, updateUser } from '@/api/user'

const manager = {
  state: {
  },

  mutations: {
  },
  actions: {
    addUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default manager
