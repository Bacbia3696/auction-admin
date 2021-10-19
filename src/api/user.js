import request from '@/utils/request'
import Axios from 'axios'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiaHVvbmducTciLCJJZCI6OCwiZXhwIjoxNjM0NzY3NjE2fQ.PKj5H68a3BAVJv8iQlMp0fXkmF9HqB6a4Sd6JUoceZ4'

export function getList(page, size) {
  const headers = { Authorization: `Bearer ${token}` }
  return Axios.post('http://188.166.185.44:9000/cms/list-user', {
    page,
    size
  }, { headers })
}

export function getDetail(id) {
  const headers = { Authorization: `Bearer ${token}` }
  const params = { id }
  return Axios.get('http://188.166.185.44:9000/cms/user/detail', { headers, params })
}

export function verify(id) {
  const headers = { Authorization: `Bearer ${token}` }
  const params = { userId: id }
  return Axios.post('http://188.166.185.44:9000/cms/verify', null, { headers, params })
}

export function lock(id) {
  const headers = { Authorization: `Bearer ${token}` }
  const params = { userId: id }
  return Axios.post('http://188.166.185.44:9000/cms/lock', null, { headers, params })
}
