export const Color = new Proxy({}, {
  get(_, prop) {
    // primary, secondary
    return `var(--zextra-${prop})`
  }
})
export const Size = new Proxy({}, {
  get(_, prop) {
    // primary, secondary
    return `var(--zextra-${prop})`
  }
})
