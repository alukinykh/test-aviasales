const labels = [
  'пересадок',
  'пересадка',
  'пересадки',
]

export const plural = (number, [zero, one, many] = labels) => {
  if (number === 1) {
    return one
  }
  if (number > 1 && number < 5) {
    return many
  }
  return zero
}
