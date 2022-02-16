import { addCategory, getCategory, updateCategory, queryCategory, deleteCategory, getCategoryTree, getSubCategory } from '@/api/category'

const manager = {
  state: {
  },

  mutations: {
  },
  actions: {
    addCategory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addCategory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCategory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCategory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateCategory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateCategory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryCategory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryCategory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteCategory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteCategory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCategoryTree ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCategoryTree(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getSubCategory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSubCategory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default manager
