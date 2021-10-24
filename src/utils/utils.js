export function formatDate(m) {
  const d = new Date(m)
  const dateString = d.getUTCDate() + '/' + d.getUTCMonth() + '/' + d.getFullYear()
  return dateString
}

export function convertUserStatus(status) {
  const m = {
    0: 'Chưa xác thực',
    1: 'Đã xác thực',
    '-1': 'Đã bị khoá'
  }
  return m[status]
}
