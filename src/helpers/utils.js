// create array from start number to end number
export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}
