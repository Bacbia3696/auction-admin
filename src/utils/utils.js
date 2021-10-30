export function formatDate(m) {
  const d = new Date(m)
  const dateString = d.getUTCDate().toString().padStart(2, 0) +
    '/' + (d.getUTCMonth() + 1).toString().padStart(2, 0) + '/' + d.getFullYear()
  return dateString
}

export function formatDateTime(m) {
  const d = new Date(m)
  const dateString = d.getUTCDate().toString().padStart(2, 0) +
    '/' + (d.getUTCMonth() + 1).toString().padStart(2, 0) + '/' + d.getFullYear()
    + ' - ' + d.getUTCHours() + ":" + d.getUTCMinutes()
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

export function moneyFilter(money) {
  return (money||0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VNĐ";
}