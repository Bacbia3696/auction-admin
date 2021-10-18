export function formatDate(m) {
  const d = new Date(m)
  const dateString = d.getUTCDate() + '/' + d.getUTCMonth() + '/' + d.getFullYear()
  return dateString
}
