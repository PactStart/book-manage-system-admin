import request from '@/utils/request'

const bookApi = {
    queryBook: '/book/query',
    addBook: '/book/add',
    addBookInventory: '/book/addInventory',
    queryBookIsbn: '/book/queryBookIsbn',
    getBook: '/book/getById',
    updateBook: '/book/update',
    deleteBook: '/book/delete',
    borrowBook: '/book/borrow',
    returnBackBook: '/book/returnBack',
    queryUserBorrowLog: '/book/userBorrowLog/query'
}

export function queryBook (parameter) {
    return request({
        url: bookApi.queryBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function addBook (parameter) {
    return request({
        url: bookApi.addBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function deleteBook (parameter) {
    return request({
        url: bookApi.deleteBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function updateBook (parameter) {
    return request({
        url: bookApi.updateBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getBook (parameter) {
    return request({
        url: bookApi.getBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function addBookInventory (parameter) {
    return request({
        url: bookApi.addBookInventory,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function queryBookIsbn (parameter) {
    return request({
        url: bookApi.queryBookIsbn,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function borrowBook (parameter) {
    return request({
        url: bookApi.borrowBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function returnBackBook (parameter) {
    return request({
        url: bookApi.returnBackBook,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function queryUserBorrowLog (parameter) {
    return request({
        url: bookApi.queryUserBorrowLog,
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
