import request from '@/utils/request'

export function createAuction(form, files) {
    const fd = new FormData();
    for (let k in form) {
        let tp = form[k] instanceof Date ? form[k].toISOString() : form[k]
        fd.set(k, tp)
    }
    for (let file of files) {
        fd.append('images', file.raw, file.name)
    }
    return request({
        url: '/cms/auction/create',
        method: 'post',
        data: fd,
    })
}

export function getList(page, size, keyword) {
    return request({
        url: '/user/auctions',
        method: 'post',
        data: {
            page,
            size,
            keyword,
        }
    })
}

export function getDetail(id) {
    return request({
        url: '/auction/detail',
        params: {
            id,
        }
    })
}

export function getBidList(id, page, size) {
    return request({
        url: '/auction/user-bid',
        data: {
            page,
            size,
            auctionId: Number(id),
        },
        method: 'POST'
    })
}

export function getRegistrationList(id, page, size) {
    return request({
        url: '/auction/user-register',
        data: {
            page,
            size,
            auctionId: Number(id),
        },
        method: 'POST'
    })
}