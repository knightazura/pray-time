const builder = (obj) => {
  const keys = Object.keys(obj)
  let queryString = ''

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      queryString += `${key}=${obj[key]}`;
    } else {
      queryString += `${key}=${obj[key]}&`;
    }
  })

  return queryString;
}

export default builder;