export function isEmptyObject(json) {
  var isEmpty = true
  for (var key in json) {
    console.log(key)
    isEmpty = false
    break
  }
  return isEmpty
}
