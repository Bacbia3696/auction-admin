export function formatDate(m) {
    let d = new Date(m)
    let dateString = d.getUTCDate() + "/" + d.getUTCMonth() + "/" + d.getFullYear()
    return dateString
}