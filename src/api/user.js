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

export function getList(page, size) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiaHVvbmducTciLCJJZCI6OCwiZXhwIjoxNjM0NDc0MzIxfQ.9DTRI66ICzFsjn_ZS1WABHhxsmp6NqO_1XH-7O7x-rE"
  const headers = { Authorization: `Bearer ${token}` };
  return Axios.post("http://188.166.185.44:9000/cms/list-user", {
    page,
    size
  }, { headers })
}


export function getDetail(id) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiaHVvbmducTciLCJJZCI6OCwiZXhwIjoxNjM0NDc0MzIxfQ.9DTRI66ICzFsjn_ZS1WABHhxsmp6NqO_1XH-7O7x-rE"
  const headers = { Authorization: `Bearer ${token}` };
  const params = { id }
  return Axios.get("http://188.166.185.44:9000/cms/user/detail", { headers, params })
}