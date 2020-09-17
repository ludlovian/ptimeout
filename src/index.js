export default class PTimeout {
  constructor (ms, val) {
    let tm
    const pt = new Promise(resolve => {
      tm = setTimeout(resolve, ms, val)
    })

    pt.cancel = () => {
      if (tm) clearTimeout(tm)
      tm = undefined
    }

    return pt
  }
}
