import { getBook, addBook, queryBook, deleteBook, updateBook, addBookInventory, queryBookIsbn, queryUserBorrowLog, borrowBook, returnBackBook } from '@/api/book'

const book = {
  state: {
  },

  mutations: {
  },
  actions: {
    getBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addBookInventory ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addBookInventory(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryBookIsbn ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryBookIsbn(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    queryUserBorrowLog ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryUserBorrowLog(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    borrowBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        borrowBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    returnBackBook ({ commit }, params) {
      return new Promise((resolve, reject) => {
        returnBackBook(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default book
