import request from '@/utils/request'

export function createAuction(form, files) {
    console.log(form)
    console.log(files)
    const fd = new FormData();
    for (let k in form) {
        let tp = form[k] instanceof Date ? form[k].toISOString() : form[k]
        console.log(tp)
        fd.set(k, tp)
    }
    fd.set("stepPrice", 1000)
    for (let file of files) {
        fd.append('images', file.raw, file.name)
    }
    return request({
        url: '/cms/auction/create',
        method: 'post',
        data: fd,
    })
}