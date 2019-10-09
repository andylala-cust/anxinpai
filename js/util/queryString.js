const queryString = {
  parse (params) {
    try {
      const arr = []
      for (let key in params) {
        arr.push(`${key}=${params[key]}`)
      }
      const str = arr.join('&')
      return str
    } catch (err) {
      console.log(err)
    }
  }
}

export default queryString;
