export const noTilde = (s) => {
  if (s.normalize !== undefined) {
    s = s.normalize('NFKD')
  }
  return s.replace(/[\u0300-\u036F]/g, '')
}
