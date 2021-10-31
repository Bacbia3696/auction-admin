import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getList(page, size, keyword) {
  return request({
    url: '/cms/list-user',
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
    url: '/cms/user/detail',
    params: { id }
  })
}

export function verify(id) {
  return request({
    url: '/cms/verify',
    method: 'POST',
    params: { userId: id }
  })
}

export function lock(id) {
  return request({
    url: '/cms/lock',
    method: 'POST',
    params: { userId: id }
  })
}
