function nullCheck(value) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    value === 'null' ||
    typeof value === 'undefined' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true
  }
  return false
}

export { nullCheck }
